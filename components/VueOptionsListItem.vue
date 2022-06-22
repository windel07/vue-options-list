<template>
	<label
		class="vue-option-list__item tw-min-h-[25px] tw-cursor-pointer tw-block"
	>
		<input
			v-bind="$attrs"
			v-model="innerValue"
			:value="nativeValue"
			class="vue-option-list__item-input tw-hidden"
		/>
		<span
			class="vue-option-list__item-label tw-pl-[30px] tw-block tw-relative"
		>
			<slot />
		</span>
	</label>
</template>

<script>
export default {
	props: {
		value: Array,
		nativeValue: [String, Number, Object],
	},
	computed: {
		innerValue: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit("input", value);
			},
		},
	},
};
</script>

<style scoped lang="scss">
.vue-option-list__item {
	&-input {
		+ span {
			&::before,
			&::after {
				content: "";
				width: 20px;
				height: 20px;
				border: 1px solid #c4c4c4;
				position: absolute;
				top: 3px;
				left: 0;
			}

			&::after {
				width: 5px;
				height: 12px;
				border-color: #fff;
				border-top: 0;
				border-left: 0;
				top: 5px;
				left: 7px;
				opacity: 0;
				transform: rotate(40deg);
			}
		}

		&:checked {
			+ span {
				&::before {
					background-color: #1c4a50;
					border-color: #1c4a50;
				}

				&::after {
					opacity: 1;
				}
			}
		}
	}
}
</style>
