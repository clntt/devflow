import { Schema, models, model, Document } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true }, // Reference to the Question model
  content: { type: String, required: true }, // Answer content, required field
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }], // Array of User IDs for upvotes
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }], // Array of User IDs for downvotes
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
