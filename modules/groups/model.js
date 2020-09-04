import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    minLenght: [5, 'Name must be 5 characters long'],
  },
  description: {
    type: String,
    require: true,
    minLenght: [10, 'Description must be 10 characters long'],
  },
  category: {
    type: String,
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup',
  }],
}, { timestamps: true });

/**
 * Create a meetup and add it to the meetups array in the group
 */
GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');
  // we add the group id to the meetup group element
  // Finally this is the author of the meetup
  const meetup = await new Meetup({ ...args, group: id });

  const group = await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
    group,
  };
};

export default mongoose.model('Group', GroupSchema);
