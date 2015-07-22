/**
 * Create by Hansel on 2015-06-26 17:32:28.
 */

/* 思路

每个collection有一个hash前缀，在创建model的时候生成
每个document的id由 hash前缀拼接上自增的serial组成

比如 User, 对应 __yellow.collections['RKGG2KTG15J1K3A']
然后每条document都有一个serial，比如19991
那么它的id等于RKGG2KTG15J1K3A19991 == 'RKGG2KTG15J1K3A'+String(19991),

示例数据：

__yellow.collections['RKGG2KTG15J1K3A'] = {
  RKGG2KTG15J1K3A19991: {
    _id: RKGG2KTG15J1K3A19991,
    _v: 0,
    username: "test",
    password: "g14gjfrj12kh2rhj12g313"
  }
}

sort的时候，默认根据serial(如"19991")排序
limit的时候，先验证是否undefined（是否被删除），再push到result
findById的时候，直接验证undefined


特殊情况：
删除某条数据的时候，造成serial有断层，需要有serial_skip方法



*/

function yellow(){



}

var undefined
var __yellow = {
  alias: {},
  collections: {},
  documents: {}
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

