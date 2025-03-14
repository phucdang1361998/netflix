<template>
    
</template>

<script setup>
import movies from "@/services/movies";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const infoFilm = ref(null);
const episodes= ref(null);

const props = useRoute();
const fetchData = async () => {
    const response = await movies.getInfoMovie(props.params.slug);
    infoFilm.value = response.data.movie
    episodes.value = response.data.episodes
    console.log(infoFilm.value, episodes.value)
}

onMounted(() => {
    fetchData();
})
</script>
