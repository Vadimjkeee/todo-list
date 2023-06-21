<template>
	<div class="tasks">
		<div class="container">
			<div class="tasks-wrapper">
				<h1 class="tasks__title">Список дел</h1>
				<ul class="tasks-list">
					<li class="tasks-list__item" v-for="task in tasks" :key="task.id">
						<div class="tasks-text">
							<p class="tasks-name">{{ task.title }}</p>
							<p class="tasks-description">{{ task.description }}</p>
						</div>
						<div class="tasks-buttons">
							<button	class="btn tasks__button-edit" @click="showEditModal(task)">Редактировать</button>
							<button	class="btn tasks__button-delete" @click="deleteTask(task.id)">Удалить</button>
						</div>
					</li>
				</ul>
				<button class="tasks__button-create btn" @click="showCreateModal">Создать задачу</button>
				<div v-if="showCreateTaskModal" class="modal-window">
					<div class="modal-window-wrapper">
						<h2 class="modal__title">Создать задачу</h2>
						<div class="modal-content">
							<input class="tasks-name" v-model="newTask.title" placeholder="Название задачи" />
							<textarea class="tasks-description" v-model="newTask.description" placeholder="Описание задачи"></textarea>
							<div class="tasks-buttons">
								<button class="btn modal__button-save" @click="createTask">Сохранить</button>
								<button class="btn modal__button-cancel" @click="cancelCreate">Отменить</button>
							</div>
						</div>
					</div>
				</div>
				<div v-if="showEditTaskModal" class="modal-window">
					<div class="modal-window-wrapper">
							<h2 class="modal__title">Редактировать задачу</h2>
							<div class="modal-content">
							<input class="tasks-name" v-model="editTask.title" placeholder="Название задачи" />
							<textarea class="tasks-description" v-model="editTask.description" placeholder="Описание задачи"></textarea>
							<div class="tasks-buttons">
								<button class="btn modal__button-save" @click="updateTask">Сохранить</button>
								<button class="btn modal__button-cancel" @click="cancelEdit">Отменить</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'TaskList',
	setup() {
		const store = useStore()
		const showCreateTaskModal = ref(false)
		const showEditTaskModal = ref(false)
		const newTask = reactive({
			title: '',
			description: ''
		})
		const editTask = reactive({
			id: '',
			title: '',
			description: ''
		})
		const tasks = store.state.tasks
		const showCreateModal = () => {
			showCreateTaskModal.value = true
			showEditTaskModal.value = false 
		}
		const cancelCreate = () => {
			showCreateTaskModal.value = false
		}
		const createTask = () => {
			store.commit('addTask', { ...newTask, id: Date.now() })
			newTask.title = ''
			newTask.description = ''
			showCreateTaskModal.value = false
		}
		const showEditModal = (task) => {
			editTask.id = task.id
			editTask.title = task.title
			editTask.description = task.description
			showEditTaskModal.value = true
			showCreateTaskModal.value = false 
		}
		const cancelEdit = () => {
			showEditTaskModal.value = false
		}
		const updateTask = () => {
			store.commit('updateTask', { id: editTask.id, updatedTask: { ...editTask } });
			updateTaskInList(editTask.id, { ...editTask });
			showEditTaskModal.value = false;
		};
		const updateTaskInList = (id, updatedTask) => {
			const taskIndex = tasks.findIndex(task => task.id === id);
			if (taskIndex !== -1) {
				tasks[taskIndex] = updatedTask;
			}
		};
		const deleteTask = (id) => {
			store.commit('deleteTask', id);
			const taskIndex = tasks.findIndex(task => task.id === id);
			if (taskIndex !== -1) {
				tasks.splice(taskIndex, 1);
			}
			if (editTask.id === id) {
				showEditTaskModal.value = false;
				editTask.id = '';
				editTask.title = '';
				editTask.description = '';
			}
		};
		return {
			tasks,
			showCreateTaskModal,
			showEditTaskModal,
			newTask,
			editTask,
			showCreateModal,
			cancelCreate,
			createTask,
			showEditModal,
			cancelEdit,
			updateTask,
			deleteTask
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.btn{
	font-weight: 400;
	font-family: "Century Gothic Regular";
	line-height: 100%;
	width: 15rem;
	cursor: pointer;
	border: none;
	padding: 1rem 2rem;
	color: white;
	border-radius: 0.4rem;
	transition: background-color 0.3s ease;
	@include adaptiv-font(1.6, 1.2);
	@media(max-width: 767px) {
		width: 10rem;
		padding: 1rem;
	}
}

.tasks {
	background: $yellow;
	height: 100vh;
	&-text{
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		text-align: left;
		max-width: 60%;    
		word-wrap: break-word;
	}
	&-wrapper {
		display: flex;
		flex-direction: column;
		text-align: center;
		row-gap: 3rem;
		padding: 2rem 1.5rem;
		@media (max-width: 767px) {
			row-gap: 1.5rem;
		}
	}
	&-name{
		padding: 1rem 0.5rem;
		font-weight: 400;
		font-family: "Century Gothic Regular";
		@include adaptiv-font(2, 1.4);
		line-height: 100%;
		color: $black;
	}
	&-description{
		padding: 1rem 0.5rem;
		font-weight: 400;
		font-family: "Century Gothic Regular";
		@include adaptiv-font(1.4, 1.2);
		line-height: 100%;
		color: $black;
		resize: none;
	}
	&__title {
		font-weight: 400;
		font-family: "Century Gothic Bold";
		@include adaptiv-font(4.8, 2);
		line-height: 100%;
		text-transform: uppercase;
		color: $white;
	}
	&__button{
		margin: 0 auto;
		&-create {
			background-color: $orange;
			width: 20rem;
			@media(max-width: 767px) {
				margin: 0 auto;
			}
		}
		&-create:hover {
			background-color: $darkOrange;
		}
		&-delete {
			background-color: $red;
		}
		&-delete:hover {
			background-color: $darkRed;
		}
		&-edit {
			background-color: $orange;
		}
		&-edit:hover {
			background-color: $darkOrange;
		}
	}
	&-list{
		&__item{
			display: flex;
			justify-content: space-between;
			border-bottom: 2px solid $black;
			align-items: center;
			padding: 1rem;
		}
	}
	&-buttons{
		display: flex;
		column-gap: 2rem;
	}
}

.modal{
	&-content{
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
	}
	&-window{
		position: absolute;
		background-color: $orange;
		padding: 2rem;
		height: 50vh;
		width: 70vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		@media(max-width: 767px) {
			width: 100%;
		}
		&-wrapper{
			display: flex;
			flex-direction: column;
			row-gap: 2rem;
		}
	}
	&__title{
		font-weight: 400;
		font-family: "Century Gothic Bold";
		@include adaptiv-font(3.2, 1.6);
		line-height: 100%;
		text-transform: uppercase;
		color: $black;
	}
	&__button{
		&-cancel {
			background-color: $red;
		}
		&-cancel:hover {
			background-color: $darkRed;
		}
		&-save {
			background-color: $green;
		}
		&-save:hover {
			background-color: $darkGreen;
		}
	}
}

.tasks-list .tasks-buttons{
	@media(max-width: 767px) {
			flex-direction: column;
			row-gap: 1rem;
		}
}

.modal-content .tasks-buttons{
	margin: 0 auto;
}

</style>