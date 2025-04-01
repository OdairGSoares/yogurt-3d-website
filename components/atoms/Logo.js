"use client"

export default function Logo({ className = "", flavorColor = "#7E22CE" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 transition-all duration-1000"
      >
        <rect width="36" height="36" rx="12" fill={flavorColor} />
        <path
          d="M18 7C14.8174 7 11.7652 8.26339 9.51472 10.5147C7.26428 12.7661 6 15.8174 6 19C6 22.1826 7.26339 25.2348 9.51472 27.4853C11.7661 29.7357 14.8174 31 18 31C21.1826 31 24.2348 29.7366 26.4853 27.4853C28.7357 25.2339 30 22.1826 30 19C30 15.8174 28.7366 12.7652 26.4853 10.5147C24.2339 8.26428 21.1826 7 18 7Z"
          fill="white"
          fillOpacity="0.4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.5 19C27.5 23.6944 23.6944 27.5 19 27.5C14.3056 27.5 10.5 23.6944 10.5 19C10.5 14.3056 14.3056 10.5 19 10.5C23.6944 10.5 27.5 14.3056 27.5 19ZM21.9665 14.0335C21.2374 13.3043 20.1332 13.3043 19.4041 14.0335L16.0335 17.4041C15.3044 18.1332 15.3044 19.2374 16.0335 19.9665L19.4041 23.3371C20.1332 24.0662 21.2374 24.0662 21.9665 23.3371L25.3371 19.9665C26.0662 19.2374 26.0662 18.1332 25.3371 17.4041L21.9665 14.0335Z"
          fill="#FF5500"
        />
      </svg>
      <span 
        className="font-bold text-xl transition-colors duration-1000"
        style={{ color: flavorColor }}
      >
        Sabores
      </span>
    </div>
  );
} 