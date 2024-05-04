const toBase64 = (str: string) => {
    return typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  };


  export const createSvgShimmer = (width: number, height: number): string => {
    const shimmer = `
          <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                  <linearGradient id="g">
                      <stop stop-color="#F5F5F5" offset="20%" />
                      <stop stop-color="#F5F5F5" offset="50%" />
                      <stop stop-color="#F5F5F5" offset="70%" />
                  </linearGradient>
              </defs>
              <rect width="${width}" height="${height}" fill="#D9D9D9" />
              <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
              <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
          </svg>
      `;
  
    return `data:image/svg+xml;base64,${toBase64(shimmer)}`;
  };