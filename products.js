import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      api: 'https://vue3-course-api.hexschool.io/v2',
      path: 'zoechen',
      products: [],
      tempProduct: {}
    }
  },
  methods: {
    checkLogin(){
        axios.post(`${this.api}/api/user/check`)
        .then((res) => {
          this.getProductList();
        })
        .catch((error) => {
          console.dir(error); // 確認錯誤原因
          alert(error.data.message); // 彈跳錯誤提示
          window.location = 'login.html' // 重回登入頁面
        });
      },
    getProductList() {
        axios.get(`${this.api}/api/${this.path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          console.log(res.data);
          alert("有載入")
        })
        .catch((error) => {
          alert(error.data.message);
        });
     },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // 取得 token
    axios.defaults.headers.common['Authorization'] = token; // 帶入 header
    this.checkLogin()
  }
}).mount('#app');