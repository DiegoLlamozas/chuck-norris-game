<script setup>
import FooterContent from "./footer-content.vue";


</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <div class="header">
    <pv-toolbar class="custom-toolbar">
      <template #start>
        <img
          src="../../../assets/Chuck_Norris_Logo.png"
          alt="Chuck_Norris.Logo.png"
          class="logo"
        />

      </template>
    </pv-toolbar>
  </div>
  <div class="main-content">
    <router-view/>
  </div>
  <div class="footer">
    <footer-content/>
  </div>
</template>

<style scoped>

.header {
  left: 0;
  top: 0;
  width: 100%;
  border: none;
}

.custom-toolbar{
  background-color: var(--color-dark-gray-2);
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.main-content {
  margin: 60px;
  min-height: 400px;
}

.footer {
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0;
  background-color: var(--color-dark-gray-2)
}


.logo {
  height: 120px;
  width: auto;
  margin: 0 auto;
  display: block;
}

.custom-toolbar :deep(.p-toolbar-group-start),
.custom-toolbar :deep(.p-toolbar-group-end) {
  flex: 1;
}

.custom-toolbar :deep(.p-toolbar-group-center) {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>