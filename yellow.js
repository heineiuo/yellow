/**
 * Create by Hansel on 2015-06-26 17:32:28.
 */

function yellow(){



}

var undefined
var __yellow = {
  collections: {}
  , documents: {}
}

/**
 * schema
 */
yellow.schema = function(obj){

  var Schema = {}

  return Schema
}



/**
 * Create or return a Model
 * @param name
 * @param shema
 */
yellow.model = function(name, schema){

  /**
   * 判断是返回还是创建
   */
  if (typeof schema == 'undefined'){
    if (name in __yellow.collections) {
      return __yellow.collections
    }
    console.warn('Collection not found!')
    return false
  }

  /**
   * 检查schema是否格式争取
   */
  if (!schemaValidate(schema)) {
    console.warn('Inellgal schema type!')
    return false
  }

  if (name in __yellow.collections) {
    console.warn('This collection has created!')
    return false
  }

  var Model = {
    __name: name,
    __schema: schema,
    __query: {},

    create: function(){
      var M = this
      var _M = __yellow.collections[name]
      var doc = {
        _id: generateId()
      }


      _M[doc._id] = doc

    },

    exec: function(){
      var M = this
      var doc = {}


      M.__query = {}

      if (doc instanceof Array) {
        return doc
      } else {

        /**
         * 封装documents对象
         */

        var wrappedDoc = {
          __id: doc._id,
          drop: function(){

          },

          save: function(){

          }

        }
        return wrappedDoc
      }

    }

    , findById: function(){
      var M = this

      M.__query.limit = 1
      return M
    }

    , findOne: function(){
      var M = this

      return M
    }

    , sort: function(){

      var M = this

    }

    , where: function(){
      var M = this
    }

    , limit: function(limit){

      var M = this;

      M.__query.limit = limit
    }

    , find: function(){

    }

    , drop: function(){
      var M = this
      __yellow.collections[M.__name] = undefined
      M = undefined
    }

  }

  return Model

}


function schemaValidate(schema){

  if (typeof schema != 'object'){
    return false
  }

  if (isEmpty(schema)){
    console.warn('Schema could not be EMPTY!')
    return false
  }

  return true
}

/**
 * Check the object is empty of not
 * @param obj
 * @return boolean
 */
function isEmpty(obj){
  var result = true

  if (typeof obj == 'object'){
    result = false
  }

  return result
}


/**
 * 产生用于document唯一标识的id
 * @returns {string}
 */
function generateId(){
  var id = ''
  var stamp = Date.now()

  return id
}

