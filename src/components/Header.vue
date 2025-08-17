<template>
  <header>
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Navbar -->
        <div class="navbar bg-base-100 shadow-sm">
          <div class="flex-none md:hidden">
            <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div class="flex-1 flex items-center gap-4">
            <router-link to="/" class="btn btn-ghost text-xl">ApotekApp</router-link>
            <div class="hidden md:flex items-center gap-4">
              <router-link to="/" class="btn btn-ghost">Home</router-link>
              <router-link to="/produk" class="btn btn-ghost">Produk</router-link>
              <router-link to="/transaksi" class="btn btn-ghost">Transaksi</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <router-link to="/" @click="closeDrawer">Home</router-link>
          </li>
          <li>
            <router-link to="/produk" @click="closeDrawer">Produk</router-link>
          </li>
          <li>
            <router-link to="/transaksi" @click="closeDrawer">Transaksi</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
function closeDrawer() {
  const drawer = document.getElementById('my-drawer')
  if (drawer) drawer.checked = false
}
</script>
