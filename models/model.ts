import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  query,
  setDoc,
  orderBy,
  getDocs,
  limit,
  updateDoc,
  startAfter,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { database, storage } from '../configs/firebase.config'

export interface ModelData {
  id: string
  updatedAt?: number
}

export default class Model {
  static instance: Model
  private dbInstance: CollectionReference
  private key: string

  constructor(key: string) {
    this.dbInstance = collection(database, key)
    this.key = key
  }

  public static getInstance(key: string) {
    return Model.instance || new Model(key)
  }

  private ref = (id: string) => doc(database, this.key, id)

  public async add(data: ModelData) {
    return await setDoc(this.ref(data.id), {
      ...data,
      updatedAt: Math.floor(new Date().getTime() / 1000),
    })
  }

  public async get(id: string) {
    const snapshot = await getDoc(this.ref(id))
    return snapshot.exists() ? (snapshot.data() as ModelData) : null
  }

  public async update(data: ModelData) {
    return await updateDoc(this.ref(data.id), {
      ...data,
      updatedAt: Math.floor(new Date().getTime() / 1000),
    })
  }

  public async getAll(props?: {
    limit?: number
    page?: number
    orderBy?: string
    after?: string | number
  }) {
    const q = query(
      this.dbInstance,
      orderBy(props?.orderBy || 'updatedAt', 'desc'),
      ...(props?.after ? [startAfter(props?.after)] : []),
      limit(props?.limit || 10)
    )

    return (await getDocs(q)).docs.map((d) => d.data() as ModelData)
  }

  public async uploadImage(image: string, filename: string) {
    const storageRef = ref(storage, filename)
    await uploadString(storageRef, image, 'data_url')

    return await getDownloadURL(storageRef)
  }
}
