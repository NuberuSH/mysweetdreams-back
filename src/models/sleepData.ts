import mongoose, { Schema, Document, Model, model } from 'mongoose';

const sleepDataSchema: Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  day: {
    type: Date,
    require: true,
    default: new Date()
  },
  start: {
    type: Date,
    require: true
  },
  end: {
    type: Date,
    require: true
  },
  mark: {
    type: Number,
    require: true
  },
  timesAwakened: {
    type: Number,
    default: 0,
    require: true
  },
  restfulSleep: {
    type: Boolean,
    require: true
  },
  notes: {
    type: String
  }
});

export interface SleepDataModel extends Document {
    user: mongoose.Types.ObjectId,
    day: Date,
    start: Date,
    end: Date,
    mark: number,
    timesAwakened: number,
    restfulSleep: boolean,
    notes: string
}


export const SleepData: Model<SleepDataModel> = model<SleepDataModel>('sleepData', sleepDataSchema); 
