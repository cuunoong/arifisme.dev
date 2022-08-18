import React from 'react'

function TiktokIcon(props: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path
        d="M18.1155 6.00894C17.0382 5.30651 16.2606 4.18262 16.0181 2.87246C15.9657 2.5894 15.9369 2.29807 15.9369 2H12.4985L12.493 15.78C12.4352 17.3231 11.1651 18.5616 9.60816 18.5616C9.12425 18.5616 8.6686 18.4406 8.26741 18.2295C7.34742 17.7454 6.71783 16.781 6.71783 15.6713C6.71783 14.0775 8.0145 12.7808 9.60816 12.7808C9.90565 12.7808 10.191 12.8299 10.461 12.9145V9.40424C10.1816 9.3662 9.89778 9.34242 9.60816 9.34242C6.11842 9.34242 3.27942 12.1816 3.27942 15.6713C3.27942 17.8124 4.34917 19.7072 5.9812 20.853C7.00918 21.5747 8.2596 22 9.60816 22C13.0979 22 15.9369 19.161 15.9369 15.6713V8.68367C17.2855 9.65161 18.9377 10.222 20.7206 10.222V6.7836C19.7602 6.7836 18.8657 6.49808 18.1155 6.00894Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default TiktokIcon
