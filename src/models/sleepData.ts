import mongoose, { Schema, Document, Model, model } from 'mongoose';

const sleepDataSchema: Schema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  day: {
    type: Date,
    required: true,
    default: new Date()
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  mark: {
    type: Number,
    required: true
  },
  timesAwakened: {
    type: Number,
    default: 0,
    required: true
  },
  restfulSleep: {
    type: Boolean,
    required: true
  },
  notes: {
    type: String
  }
});

export interface SleepDataModel extends Document {
    userId: string,
    day: Date,
    start: Date,
    end: Date,
    mark: number,
    timesAwakened: number,
    restfulSleep: boolean,
    notes?: string
}


export const SleepData: Model<SleepDataModel> = model<SleepDataModel>('sleepData', sleepDataSchema); 
