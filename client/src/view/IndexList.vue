<template>
    <div>
        <HeaderNav/>
        <NavBread>
            <router-link to="/" tag='span' style="cursor:pointer;">商品</router-link>
        </NavBread>

        <Index/>
        <Footer></Footer>
    </div>
</template>

<script>
import Index from "@/components/Index"
import HeaderNav from '@/components/Head'
import NavBread from '@/components/NavBread'
import Footer from '@/components/Foot'
export default {
  components:{
      Index,
      HeaderNav,
      NavBread,
      Footer
  }
}
</script>

