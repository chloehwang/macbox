* {
  box-sizing: border-box
}
#nav-promotions {
  background-color:#D88A8A;
  height: 30px;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 2
}

#navbar {
  background-color: #3F232D;
  vertical-align: middle;
  top: 30px;
  border: none
}

#nav-border {
  background-color:#F8EDD1;
  height: 10px;
  width: 100vw;
  position: fixed;
  top: 80px;
  z-index: 2
}

.navbar-inverse .navbar-nav>li>a, .navbar-inverse .navbar-brand {
  color: white
}

#body {
  padding-top: 145px;
}

#footer {
  position: relative;
  margin-top: 125px;
  height: 300px;
  clear: both;
  background-color: #F8EDD1;
  text-align: center;
  vertical-align: middle
}

#googleBtn {
  margin-left: 15px;
  width: 45%;
}

/***HOME PAGE***/
.grid-box {
  border: 3px solid white;
  padding: 0
}


.float-right {
  float: right
}

.grid-box-hover {
  background-color: rgba(49, 39, 54, 0.55);
  margin: 0;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity .25s;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center
}

.grid-box-hover:hover {
  opacity: 1
}

.shop-icon {
  border: 1px solid white;
  padding: 10px;
  width: 115px;
  margin: 0 auto
}

/* Single Product Page */

.img-responsive {
  width: 100%;
}

.show-grid {
  text-align: center;
}

.product-info  {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around
}
.emphasis-btn a {
  text-decoration: none;
  color: white
}

.emphasis-btn {
  width: 130px;
  margin: 0 auto;
}
 .rating-stars {
   font-size: 2em;
   color: rgb(241, 218, 21);
}

/* CART */

.cart h3 {
  margin-top: 5px
}

.quantity-form {
  width: 20%;
  margin: 0 auto
}
