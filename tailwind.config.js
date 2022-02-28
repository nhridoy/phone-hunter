module.exports = {
  purge: ["./index.html"],
  content: ["./src/**/*.{html,js}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        lightGray: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
