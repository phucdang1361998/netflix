
<template>
    <div class="w-full h-full bg-[rgba(16,16,16,255)]">
      <div class="w-full flex">
        <div :class="['fixed flex justify-between z-40 w-full px-15 bg-gradient-to-b from-black/80', {'bg-black transition-color duration-800': isScrolled}]">
          <div class="flex items-center gap-5">
              <a href="#" class="mr-8">
                <img class="w-[100px]" src="/src/assets/img/Vector__3_.svg"/>
              </a>
              <div v-for="(category, index) in categoriesLeft" 
                :key="index" 
                :class="['py-2 my-3 cursor-pointer', {'font-bold' : selected == index}]" 
                @click="selectCategory(index)">
                <h2 class="text-white">{{ category }}</h2>
            </div>
          </div>
          <div class="flex">
              <div v-for="(category, index) in categoriesRight" 
                :key="index" 
                :class="['py-2 mx-3 my-3 cursor-pointer', {'font-bold' : selected == index}]" 
                @click="selectCategory(index)">
                <component :is="category" fill-color="#FFFFFF" />
            </div>
          </div>
        </div>  

        <div class="flex w-full flex-col justify-center gap-10 h-200">
          <div class="flex flex-row items-center w-full z-30 px-11 mt-80">
            <img width="50" src="./assets/img/nficon2016.ico" alt="">
            <p class="text-gray-300 font-bold text-3xl">LOẠT PHIM</p>
          </div>
          <p class="text-white text-5xl font-bold z-30 px-11">{{ filmRandomInfo.name }}</p>
          <div class="flex flex-row gap-3 z-30 px-11">
            <div class="py-2 pl-5 pr-8 rounded-sm text-black bg-white font-bold flex items-center">
              <Play fill-color="black" :size="40"></Play>
              <p class="text-xl">Phát</p>
            </div>
            <div class=" flex gap-2 items-center py-2 px-10 rounded-sm text-white font-bold bg-[rgba(109,109,110,0.7)]">
              <InfoOutLine fill-color="white" :size="40"/>
              <p class="text-xl">Thông tin khác</p>
            </div>
          </div>
     
          <div class="absolute w-full">
            <img width="100%" :src="filmRandomInfo.poster_url" alt="">
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="fixed w-full h-full bg-black flex items-center justify-center z-999">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-red-500"></div>
      </div>
      <div v-else class="flex flex-wrap gap-3 justify-center mt-10 mx-10">
          <div v-for="(film, index) in data" :key="index" class="relative group cursor-pointer">
            <img :src="film.images" alt="" width="250" class="rounded-lg" loading="lazy">
            <div class="absolute inset-0 bg-gray-900 rounded-lg flex flex-col justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <iframe width="100%" src="https://vip.opstream16.com/share/7362b26d78069dd38f4b45743fddc7ee" frameborder="1" allowfullscreen allow="autoplay; encrypted-media"></iframe>
              <h5 class="text-white">
                {{ film.name }}
              </h5>
              <h6 class="text-gray-400">
                {{ film.origin_name }}
              </h6>
              
              <div class="mt-2 flex gap-1 items-center">
                <Star fill-color="red"/>
                <p class="text-gray-400">{{ film.tmdb.vote_average }}</p>
                <p class="text-gray-400">{{ film.year }}</p>
                <div class="border-2 rounded-2xl p-1 text-gray-400 w-10 text-center leading-3 h-6 text-xs">
                  HD
                </div>
              </div>

              <div class="flex gap-2 items-center mt-2 text-xs">
                  <div class="border-2 rounded-2xl p-1 text-gray-400 w-15 text-center h-6 leading-3">
                     VIETSUB
                  </div>
                  <p class="text-gray-400">42 phút/tập</p>
                  <Eyes fill-color="gray" :size="20"/>
                  <p class="text-gray-400">{{ film.tmdb.vote_count }}</p>
              </div>

              <div class="flex gap-1 items-center mt-5 text-xs">
                <PlayCircleOutline fill-color="red"/>
                <p class="text-white font-bold">XEM PHIM</p>
              </div>
            </div>
          </div>
      </div>
      <div class="flex justify-center p-10 gap-3 items-center">
        <button class="text-white bg-red-700 p-2 rounded-lg cursor-pointer" @click="choosePage(1)" :hidden="currentPage === 1">Trang đầu</button>
        <button class="text-white bg-red-700 p-2 rounded-lg cursor-pointer" @click="redirectPage('prev')" :hidden="currentPage === 1">Trang trước</button>
         <div v-for="(number, key) in listPage" :key="key">
          <button :class="['text-white cursor-pointer', { 'bg-red-700 p-1 rounded-lg': number == currentPage }]" @click="choosePage(number)">{{ number }}</button>
         </div>
        <button class=" text-white bg-red-700 p-2 rounded-lg cursor-pointer" @click="redirectPage('next')" :hidden="currentPage === totalPages">Trang tiếp</button>
        <button class=" text-white bg-red-700 p-2 rounded-lg cursor-pointer" @click="choosePage(totalPages)" :hidden="currentPage === totalPages">Trang cuối</button>
      </div>
    </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import  Magnify  from 'vue-material-design-icons/Magnify.vue'
import  BellRing  from 'vue-material-design-icons/BellRingOutLine.vue'
import  Info  from 'vue-material-design-icons/Information.vue'
import Star from 'vue-material-design-icons/Star.vue'
import movies from './services/movies';
import Eyes from 'vue-material-design-icons/Eye.vue'
import PlayCircleOutline from 'vue-material-design-icons/PlayCircleOutline.vue'
import Play from 'vue-material-design-icons/Play.vue'
import InfoOutLine from 'vue-material-design-icons/InformationOutLine.vue'
import { random, range } from './helpers/common.js'
const selected = ref(0)
const categoriesLeft = ['Trang chủ', 'Series', 'Phim', 'Mới & phổ biến', 'Danh sách của tôi', 'Duyệt tìm theo ngôn ngữ'];
const categoriesRight = [Magnify, BellRing, Info];
const data = ref(null)
const currentPage = ref(1);
const totalPages = ref(0);
const isLoading = ref(false);
const listPage = ref(null);
const isScrolled = ref(false);
const filmRandomInfo = ref(false)

const selectCategory = (index) => {
  selected.value = index;
};

const redirectPage = (type) => {
  if (type == 'next') {
    currentPage.value++;
  } else {
    currentPage.value--;
  }
}

const choosePage = (numberPage) => {
    currentPage.value = numberPage
}

const fetchData = async () => {
  isLoading.value = true
  try {
      const response = await movies.getListMovieNew(`?page=${currentPage.value}`);
      data.value = response.data.items;
      data.value.map((film) => {
        film.images = movies.getImageOfMovie(film.thumb_url)
      })
      filmRandomInfo.value = data.value[random(data.value.length)];
      filmRandomInfo.value.poster_url = movies.getImageOfMovie(filmRandomInfo.value.poster_url)
      totalPages.value = response.data.pagination.totalPages
      listPage.value = range(currentPage.value, currentPage.value == totalPages.value ? currentPage.value : currentPage.value + 5)
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false;
    }
}

const handleScroll = () => {
  scrollY = window.pageYOffset;
  if (scrollY > 0) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  fetchData();
  window.addEventListener("scroll", handleScroll)
});

onUnmounted(() => {
  window.removeEventListener('scroll')
})

watch(currentPage, fetchData)

</script>