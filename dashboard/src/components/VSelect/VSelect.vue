<template>
  <a-dropdown :trigger="['click']" @visibleChange="visibleChange" v-model="visible">
    <div @click="inputWrapperClick" ref="input" @mouseover="mouseover=true" @mouseleave="mouseover=false">
      <a-input v-model="showLabel" @focus="onInputFocus" @keyup.native="onInputKeyup" @blur="onInputBlur"
               :placeholder="currentLabel || placeholder">
        <a-icon v-show="closeShow" style="cursor: pointer" @click.native.stop="clearValue" slot="suffix"
                type="close-circle"/>
      </a-input>
    </div>
    <div class="v-select-dropdown" slot="overlay">
      <virtual-list :key="randomKey" ref="virtualList" v-if="currentOptions.length"
                    style="max-height: 300px; overflow-y: auto;"
                    :estimate-size="itemHeight" :data-key="itemKeyProp"
                    :data-sources="currentOptions" :data-component="ItemComponent"></virtual-list>
      <a-empty v-else style="padding: 20px 0"></a-empty>
    </div>
  </a-dropdown>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import debounce from 'lodash/debounce'

export default {
  name: 'VSelect',
  components: { VirtualList },
  props: {
    placeholder: String,
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    itemKeyProp: {
      type: String,
      required: true
    },
    itemLabelProp: {
      type: String,
      required: true,
      default: 'label'
    },
    itemValueProp: {
      type: String,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 32
    }
  },
  computed: {
    closeShow () {
      return this.currentValue && this.mouseover
    }
  },
  data () {
    return {
      randomKey: 1,
      visible: false,
      mouseover: false,
      currentValue: '',
      currentLabel: '',
      showLabel: '',
      currentOptions: [],
      ItemComponent: {
        props: {
          index: [Number, String],
          source: {
            type: Object,
            default: () => ({})
          },
        },
        methods: {
          dispatch (componentName, eventName, ...rest) {
            let parent = this.$parent || this.$root
            let name = parent.$options.name

            while (parent && (!name || name !== componentName)) {
              parent = parent.$parent
              if (parent) {
                name = parent.$options.name
              }
            }

            if (parent) {
              parent.$emit.apply(parent, [eventName].concat(rest))
            }
          },
          emitEvents (value, label) {
            this.dispatch('VSelect', 'itemClick', value, label)
          }
        },
        render () {
          return <div
              class="v-select-item"
              style="height: 32px; line-height: 32px; padding: 0 10px; cursor: pointer;"
              onClick={this.emitEvents.bind(this, this.source.value, this.source.label)}>{this.source.label}</div>
        }
      }
    }
  },
  watch: {
    value: {
      handler (v) {
        this.currentValue = v
        this.currentLabel = this.options.find(_ => _.value === v)?.label
        this.showLabel = this.currentLabel
      },
      immediate: true
    },
    currentValue: {
      handler (v) {
        this.$emit('input', v)
      }
    },
    options: {
      handler (v) {
        this.currentOptions = JSON.parse(JSON.stringify(v))
        this.currentLabel = v.find(_ => _.value === this.value)?.label
        this.showLabel = this.currentLabel
        this.randomKey = Math.random()
      },
      immediate: true
    }
  },
  created () {
    this.$on('itemClick', (v, label) => {
      this.currentValue = v
      this.currentLabel = label
      this.visible = false
      this.$emit('itemCLick', this.currentValue)
      // this.showLabel = label
    })
  },
  methods: {
    clearValue () {
      this.currentValue = ''
    },
    onInputFocus () {
      this.showLabel = ''
      this.currentOptions = JSON.parse(JSON.stringify(this.options))
    },
    onInputBlur () {
      this.showLabel = this.currentLabel
    },
    onInputKeyup: debounce(function () {
      this.currentOptions = this.options.filter(_ => _.label.indexOf(this.showLabel) > -1)
      this.randomKey = Math.random()
    }, 200),
    inputWrapperClick () {
      setTimeout(() => {
        this.visible = true
      }, 50)
    },
    visibleChange () {
      // if(!visible) {
      //   this.$refs['input'].querySelector('input').blur()
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.v-select-dropdown {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}
</style>

<style lang="scss">
.v-select-item {
  &:hover, .active {
    background: #edfcf6;
  }
}
</style>
