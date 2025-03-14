<template>
    <div class="w-full h-screen bg-black p-4 relative">
      <div class="flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-5">
            <Menu fill-color="white" size="25"></Menu>
            <div class="flex items-center gap-1">
              <img src="https://www.youtube.com/s/desktop/9521d18f/img/logos/favicon_48x48.png" width="30">
              <p class="text-white font-bold text-xl">Premium</p>
              <sup class="text-gray-500 font-bold">VN</sup>
            </div>
          </div>
          <div class="flex  items-center">
              <div class="p-3 flex border-1 border-[rgba(39,39,39,255)] rounded-l-4xl items-center">
                <input type="text" class="text-gray-400 w-[500px] focus:outline-none" placeholder="Tìm kiếm">
                <Keyboard fill-color="gray" class="cursor-pointer"></Keyboard>
              </div>
              <div class="bg-[rgba(39,39,39,255)] p-3 border-1 border-[rgba(39,39,39,255)] rounded-r-4xl cursor-pointer flex w-[70px] justify-center">
                <Search fill-color="white"></Search>
              </div>
              <div class="bg-[#232323] p-3 rounded-4xl ml-5 hover:bg-[#333333] cursor-pointer"> 
                <Microphone fill-color="white"></Microphone>
              </div>
          </div>
          <div class="flex gap-3 items-center ">
            <div class="flex bg-[#232323] items-center py-2 pr-4 pl-3 gap-2 rounded-2xl cursor-pointer hover:bg-[#333333]">
              <Plus fill-color="white" size="25"></Plus>
              <p class="text-white">Tạo</p>
            </div>
            <BellRing fill-color="white" size="25"></BellRing>
            <img src="../assets/img/slider-1.jpg" alt="" class="block h-9 w-9 rounded-4xl">
          </div>
        </div>
        <div class="flex px-20 gap-5">
          <div v-for="(title, key) in titles" :key="key" :class="['text-white bg-[#232323] p-2 rounded-lg font-medium', {'!bg-white !text-black': key == 0}]">
              <p>{{ title }}</p>
          </div>
        </div>
      </div>
      <div class="absolute bg-white w-1/18 h-full z-20">
        sdsd
      </div>
    </div>
</template>

<script setup>
import Menu from 'vue-material-design-icons/Menu.vue';
import BellRing from 'vue-material-design-icons/BellRingOutLine.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import Keyboard from 'vue-material-design-icons/Keyboard.vue';
import Search from 'vue-material-design-icons/SearchWeb.vue';
import Microphone from 'vue-material-design-icons/Microphone.vue';
import { ref } from 'vue';
const titles = ['Tất cả', 'Âm nhạc','Podcast','Danh sách kết hợp','Trực tiếp','Trò chơi','Mới tải lên gần đây','Đã xem','Đề xuất mới'];
const titleSelected = ref(false);
</script>