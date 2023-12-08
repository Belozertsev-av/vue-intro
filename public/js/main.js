Vue.component('feedback', {
	template: `<div class="main__feedbackbody">
					<div class="feedback__tray">
						<div class="feedback__tab" v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab" :class="{selectedtab: selectedTab === tab}">{{tab}}
					</div>
					</div>
					<div class="main__reviews">
						<form class="main__form" @submit.prevent="onSubmit" v-show="selectedTab === 'Отзывы'">
							<div class="feedback__body">
								<div class="feedback__label">Оцените товар:</div>
								<div class="feedback__form">
									<div class="feedback__rating rating_set">
										<div class="rating__active"></div>
										<div class="rating__items">
											<input type="radio" name="formRating" value="1" class="rating__item" v-model="rating" required>
											<input type="radio" name="formRating" value="2" class="rating__item" v-model="rating" required>
											<input type="radio" name="formRating" value="3" class="rating__item" v-model="rating" required>
											<input type="radio" name="formRating" value="4" class="rating__item" v-model="rating" required>
											<input type="radio" name="formRating" value="5" class="rating__item" v-model="rating" required>
										</div>
									</div>
								</div>
								<div class="feedback__label">Оставьте отзыв:</div>
								<div class="feedback__input">
									<textarea class="feedback__text" name="comment" cols="30" rows="10"
										placeholder="Напишите свой комментарий" v-model="review" required></textarea>
								</div>
								<div class="feedback__button ">
									<input type="submit" class="rating__submit button">
								</div>
							</div>
						</form>
						<div class="main__reviews-column" v-show="selectedTab === 'Оставить отзыв'">
							<h2>Отзывы</h2>
							<p v-if="!reviews.length">Отзывов пока нет</p>
							<ul>
								<li v-for="review in reviews">
								<p><span>Оценка пользователя:</span> {{ review.rating }}</p>
								<p><span>Отзыв пользователя:</span> <br>{{ review.review }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>`,
	data() {
		return {
			review: null,
			rating: null,
			reviews: [],
			tabs: ['Отзывы', 'Оставить отзыв'],
			selectedTab: 'Отзывы',
		}
	},
	methods: {
		onSubmit() {
			let productReview = {
				review: this.review,
				rating: this.rating,
			}
			this.reviews.push(productReview)
			this.review = null
			this.rating = null
		},
	}
})
Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true,
		},
	},
	template: `<div class="main__body">
					<div class="main__columns">
						<div class="main__column">
							<div class="main__img"><img :src="image_force" :alt="altText"></div>
							<div class="main__foot">
								<div class="main__block">
									<button class="main__button button" v-on:click="addToCart" :disabled="!inStock"
										:class="{ disabledButton: !inStock }">В
										корзину</button>
									<div class="main__counter">{{$root.cart.length}}</div>
								</div>
								<div class="main__block">
									<button class="main__button button main__rem" v-on:click="DeleteFromCart">Удалить из корзины</button>
								</div>
							</div>
						</div>
						<div class="main__column">
							<div class="main__title title">{{ title }}</div>
							<div class="main__subtitle subtitle">{{product_color + ' ' + product_size + ' ' + 'размера'}}
							</div>
							<div class="main__description description">Lorem ipsum dolor sit amet consectetur
								adipisicing
								elit.
								Excepturi
								natus magnam quisquam nam pariatur praesentium nulla fuga illum! Sunt quos illum
								reprehenderit pariatur nulla officia? Natus veniam delectus laudantium! Recusandae,
								voluptatem veritatis? Commodi atque esse nobis assumenda, dignissimos cupiditate beatae
								vel, ex reprehenderit excepturi voluptates minima rerum aspernatur quae porro dolorum.
								Quaerat aliquid facere dolore temporibus perferendis? Amet ipsam voluptates fuga
								excepturi, culpa fugiat. Temporibus veniam magnam at nostrum libero enim placeat
								necessitatibus nihil, totam amet, a ullam animi, maiores rem quos suscipit minima error
								perspiciatis adipisci est molestiae dolor. Eveniet repudiandae velit error dolorum
								saepe quia itaque qui. Ut!</div>
							<div class="main__details description">
								<ul>
									<li v-for="detail in details">{{detail}}</li>
								</ul>
							</div>
							<div class="main__choice">
								<div class="choice__title subtitle">Размер: </div>
								<div class="choice__innerbody">
									<div class="choice__body" v-for="(size, index) in sizes" :key="size.id">
										<div class="choice__size" v-on:click="updateSize(index)">{{size.sizeNum}}</div>
									</div>
								</div>
							</div>
							<div class="main__choice">
								<div class="choice__title subtitle color__title">Цвет: </div>
								<div class="choice__color" v-for="(variant, index) in variants" :key="variant.variantId"
									:style="{ backgroundColor : variant.variantColor }" v-on:click="updateProduct(index)">
								</div>
							</div>
							<div class="main__stock">
								<p v-if="inStock > 1">Есть в наличии</p>
								<p v-else-if="inStock === 1">Осталась 1 пара</p>
								<p v-else>Нет в наличии</p>
							</div>
							<div class="main__user">Стоимость доставки: {{shipping}}</div>
						</div>
					</div>
					<feedback></feedback>
				</div>`,
	data() {
		return {
			product_type: "Кроссовки",
			product: "Nike Air Force 1",
			selected_size: 0,
			selected_variant: 0,
			altText: "Пара кроссовок Nike",
			details: ["80% полиэстер", "20% хлопок", "Подошва из пено-полиуретана"],
			variants: [
				{
					variantId: 001,
					variantColor: "#fff",
					variantImage: "./img/force-white.jpg",
					variantColorName: "Белые",
					Quantity: 10,
				},
				{
					variantId: 002,
					variantColor: "rgba(255, 255, 255, 0.3)",
					variantImage: "./img/force-grey.jpg",
					variantColorName: "Серые",
					Quantity: 0,
				},
				{
					variantId: 003,
					variantColor: "rgb(128, 126, 0)",
					variantImage: "./img/force-olive.jpg",
					variantColorName: "Оливковые",
					Quantity: 1,
				},
			],
			sizes:
				[
					{
						id: 201,
						sizeNum: "36",
					},
					{
						id: 202,
						sizeNum: "37",
					},
					{
						id: 203,
						sizeNum: "38",
					},
					{
						id: 204,
						sizeNum: "39",
					},
					{
						id: 205,
						sizeNum: "40",
					},
					{
						id: 206,
						sizeNum: "41",
					},
				],
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selected_variant].variantId)
		},
		DeleteFromCart() {
			this.$emit('delete-from-cart')
		},
		updateProduct(index) {
			this.selected_variant = index

		},
		updateSize(index) {
			this.selected_size = index
		},

	},
	computed: {
		title() {
			return this.product_type + ' ' + this.product
		},
		image_force() {
			return this.variants[this.selected_variant].variantImage
		},
		product_color() {
			return this.variants[this.selected_variant].variantColorName
		},
		product_size() {
			return this.sizes[this.selected_size].sizeNum
		},
		shipping() {
			if (this.premium) {
				return "Бесплатно"
			} else {
				return "500 рублей"
			}
		},
		local_cart() {
			return this.cart.length
		},
		inStock() {
			return this.variants[this.selected_variant].Quantity
		},
	},
})

var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: [],
	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		},
		deleteCart() {
			this.cart.pop()
		},
		removeAll() {
			this.cart.splice(0, this.cart.length)
		},
	},
})