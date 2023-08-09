import {useRouter} from 'next/router'
import React, { useEffect } from 'react'

function Timesheet() {
    const router = useRouter()
  useEffect(() => {
    open(`https://arifisme.dev/api/timesheet/${router.query.month}/${router.query.year}`, '__self')
  }, [])
  return <div></div>
}

export default Timesheet
