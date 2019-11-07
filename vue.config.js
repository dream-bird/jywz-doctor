module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: `dist-jywz-${require("./package").version}`,
  productionSourceMap: false,
  devServer: {
    port: 8066,
    proxy: {
      "/oauth": {
        target: "http://172.30.3.217:9090",
        changeOrigin: true
      },
      "/api": {
        target: "http://172.30.3.217:9090",
        changeOrigin: true
      }
    }
  },
  pages: {
    index: {
      entry: "src/pages/patient/main.js"
    },
    doctor: {
      entry: "src/pages/doctor/main.js"
    },
    machine: {
      entry: "src/pages/machine/main.js"
    }
  }
};
