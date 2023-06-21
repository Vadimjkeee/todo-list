<template>
	<div class="main-page">
		<div class="contaner">
			<div class="main-page-wrapper">
				<h1 class="main-page__title">Добро пожаловать в "Task manager"</h1>
				<div class="main-page-content">
					<router-link class="main-page__link" to="/tasks">Запланировать дела</router-link>
					<img :src="imagePath" alt="Image" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomePage',
	computed: {
		imagePath() {
			return require('@/assets/img/to-do-list.svg')
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.main-page-content img{
	width: 3rem;
	@media(max-width: 767px) {
		width: 2rem;
	}
}
.main-page {
	background: $yellow;
	height: 100vh;
	&-content {
		display: flex;
		column-gap: 2rem;
		align-items: center;
		@media(max-width: 767px) {
			flex-direction: column;
			row-gap: 1rem;
		}
	}
	&-wrapper {
		display: flex;
		flex-direction: column;
		text-align: center;
		row-gap: 3rem;
		height: 100vh;
		justify-content: center;
		align-items: center;
		padding: 0 1.5rem;
		@media (max-width: 767px) {
			row-gap: 1.5rem;
		}
	}
	&__title {
		font-weight: 400;
		font-family: "Century Gothic Bold";
		@include adaptiv-font(4.8, 2);
		line-height: 100%;
		text-transform: uppercase;
		color: $white;
	}
	&__link {
		font-weight: 400;
		font-family: "Century Gothic Regular";
		@include adaptiv-font(3.2, 1.4);
		line-height: 100%;
		text-transform: uppercase;
		color: $black;
	}
}
</style>
