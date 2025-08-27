<template>
      <!-- Sidebar -->
      <div class="sidebar" data-background-color="dark">
        <div class="sidebar-logo">
          <!-- Logo Header -->
          <div class="logo-header" data-background-color="dark">
            <a href="index.html" class="logo">
              <img
                src="/public/assets/img/apotek.png"
                alt="navbar brand"
                class="navbar-brand"
                height="100"
              />
            </a>
            <div class="nav-toggle">
              <button class="btn btn-toggle toggle-sidebar">
                <i class="gg-menu-right"></i>
              </button>
              <button class="btn btn-toggle sidenav-toggler">
                <i class="gg-menu-left"></i>
              </button>
            </div>
            <button class="topbar-toggler more">
              <i class="gg-more-vertical-alt"></i>
            </button>
          </div>
          <!-- End Logo Header -->
        </div>
        <div class="sidebar-wrapper scrollbar scrollbar-inner">
          <div class="sidebar-content">
            <ul class="nav nav-secondary">
              <li class="nav-item active">
                <router-link to="/" >
                 <i class="fas fa-home"></i>
                  <p>Dashboard</p>
                
                  </router-link>
              </li>
          
              <li class="nav-item">
                <a data-bs-toggle="collapse" href="#products">
                  <i class="fas fa-pen-square"></i>
                  <p>Master Produk</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="products">
                  <ul class="nav nav-collapse">
                    <li>
                      <a href="forms/forms.html">
                        <span class="sub-item">Produk</span>
                      </a>
                    </li>
                    <li>
                      <a href="forms/forms.html">
                        <span class="sub-item">Kategori</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
       
            </ul>
          </div>
        </div>
      </div>
      <!-- End Sidebar -->
</template>
