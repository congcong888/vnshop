<template>
    <div>
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <router-link to="/index">首页</router-link>
                    <!-- <a href="/index">首页</a> -->
                    <slot></slot>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>

