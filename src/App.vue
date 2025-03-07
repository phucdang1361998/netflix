
<template>
    <div class="w-full h-full bg-black">
      <div class="flex justify-around z-40 relative">
        <div class="flex">
          <img class="w-[100px]" src="/src/assets/img/logo.jpg"/>
            <div v-for="(category, index) in categoriesLeft" 
              :key="index" 
              :class="['py-2 mx-5 my-3 cursor-pointer', {'font-bold' : selected == index}]" 
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
      <div v-if="isLoading" class="fixed w-full h-full bg-black flex items-center justify-center z-999">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-red-500"></div>
      </div>
      <div v-else class="flex flex-wrap gap-3 justify-center mt-10 mx-10">
          <div v-for="(film, index) in data" :key="index" class="relative group cursor-pointer">
            <!-- <h2 class="text-white">{{ film.origin_name }}</h2> -->
            <img :src="film.images" alt="" width="230" class="rounded-lg" loading="lazy">
            <div class="absolute inset-0 bg-gray-900 rounded-lg flex-col justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
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
                <Play fill-color="red"/>
                <p class="text-white font-bold">XEM PHIM</p>
              </div>
            </div>
          </div>
      </div>
      <div class="flex justify-center p-10 gap-3 items-center">
        <button class="text-white bg-red-700 p-2 rounded-lg cursor-pointer" @click="redirectPage('prev')" :hidden="currentPage === 1">Prev</button>
        <!-- <span class="text-white mx-2">{{ currentPage }} / {{ totalPages }}</span> -->
         <div v-for="(number, key) in listPage" :key="key">
          <button class="text-white cursor-pointer" @click="choosePage(number)">{{ number }}</button>
         </div>
        <button class=" text-white bg-red-700 p-2 rounded-lg cursor-pointer" @click="redirectPage('next')" :hidden="currentPage === totalPages">Next</button>
      </div>
    </div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
import  Magnify  from 'vue-material-design-icons/Magnify.vue'
import  BellRing  from 'vue-material-design-icons/BellRingOutLine.vue'
import  Profile  from 'vue-material-design-icons/Information.vue'
import Star from 'vue-material-design-icons/Star.vue'
import movies from './services/movies';
import Eyes from 'vue-material-design-icons/Eye.vue'
import Play from 'vue-material-design-icons/PlayCircleOutline.vue'
import { range } from './helpers/common.js'
const selected = ref(0)
const categoriesLeft = ['Trang chủ', 'Series', 'Phim', 'Mới & phổ biến', 'Danh sách của tôi', 'Duyệt tìm theo ngôn ngữ'];
const categoriesRight = [Magnify, BellRing, Profile];
const data = ref(null)
const currentPage = ref(1);
const totalPages = ref(0);
const isLoading = ref(false);
const listPage = ref(null)

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
      totalPages.value = response.data.pagination.totalPages
      listPage.value = range(currentPage.value, currentPage.value + 5)
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false;
    }
}

onMounted(fetchData);

watch(currentPage, fetchData)

</script>