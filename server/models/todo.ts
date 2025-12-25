import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

export const TodoModel = mongoose.models.Todo || mongoose.model('Todo', schema)
