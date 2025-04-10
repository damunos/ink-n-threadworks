const config = {
    APP_NAME: "Ink N Threadworks",
    BASE_URL: process.env.REACT_APP_BASE_URL || "https://ink-n-thread.up.railway.app",
    API_ENDPOINTS: {
      PRODUCTS: "/api/products",
      DESIGN_UPLOAD: "/api/design/upload",
      ORDER_TRACKING: "/api/orders/track",
    },
    SUPPORT_EMAIL: "support@inknthreadworks.com",
    DEFAULT_CURRENCY: "USD",
  };
  
  export default config;
  