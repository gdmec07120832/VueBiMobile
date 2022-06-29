import Vue from 'vue'
import store from "@/store";
import router from "@/routes";

export const createDialog = (VueComponentOptions) => {
  let instance
  let destroy = () => {
    if(instance) {
      instance.$destroy()
      instance = null
    }
  }
  return {
    create(options = {}, cb = () => {}) {
      if(typeof options === 'function') {
        cb = options
        options = {}
      }
      if(options.destroy) {
        destroy()
      }
      if(!instance) {
        const Ctor = Vue.extend(VueComponentOptions)
        instance = new Ctor({...options, store, router})
        instance.$mount()
        const owner = this
        if(owner && owner._isVue) {
          let d = owner.$options.beforeDestroy
          owner.$options.beforeDestroy = d ? Array.isArray(d) ? d.concat(destroy) : [d, destroy] : [destroy]
        }
        document.body.append(instance.$el)
      }

      Vue.nextTick(() => {
        if(options.propsData) {
          Object.keys(options.propsData).forEach(key => {
            instance.$props[key] = options.propsData[key]
          })
        }
        instance.visible = true
        cb(instance)
      })
    },
    destroy
  }
}


export const treeMap = (tree, key = 'id', childrenKey = 'children') => {
  const recursive = (tree0, acc = {}) => {
    for(let item of tree0) {
      acc[item[key]] = item
      if(item[childrenKey] && item[childrenKey].length) {
        recursive(item[childrenKey], acc)
      }
    }
    return acc
  }
  return recursive(tree, {})
}

export const flattenTree  = (tree = [], childrenKey = 'children') => {
  const recursive = (tree0, acc = []) => {
    for(let item of tree0) {
      acc.push(item)
      if(item[childrenKey] && item[childrenKey].length) {
        recursive(item[childrenKey], acc)
      }
    }
    return acc
  }
  return recursive(tree, [])
}
