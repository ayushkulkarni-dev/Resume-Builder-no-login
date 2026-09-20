import mongoose from 'mongoose';
import Resume from '../models/Resume.model.js';

// Strip invalid _id fields from subdocument arrays before saving.
// The client generates temporary _id values (e.g., Date.now().toString())
// that are not valid ObjectIds and cause Mongoose CastErrors.
const sanitizeSections = (sections) => {
  if (!sections) return sections;
  const cleaned = { ...sections };
  const arrayFields = ['experience', 'education', 'projects', 'certifications'];

  for (const field of arrayFields) {
    if (Array.isArray(cleaned[field])) {
      cleaned[field] = cleaned[field].map(({ _id, ...rest }) => {
        if (_id && mongoose.Types.ObjectId.isValid(_id)) {
          return { _id, ...rest };
        }
        return rest;
      });
    }
  }
  return cleaned;
};

export const createResume = async (data = {}) => {
  const resume = await Resume.create({
    title: data.title || 'Untitled Resume',
    templateId: data.templateId || 'classic',
    targetRole: data.targetRole || '',
  });
  return resume;
};

export const getResumesByUser = async () => {
  const resumes = await Resume.find({})
    .sort({ updatedAt: -1 })
    .select('-__v');
  return resumes;
};

export const getResumeById = async (resumeId) => {
  const resume = await Resume.findOne({ _id: resumeId }).select('-__v');
  if (!resume) {
    const error = new Error('Resume not found.');
    error.statusCode = 404;
    throw error;
  }
  return resume;
};

export const updateResume = async (resumeId, updateData) => {
  if (updateData.sections) {
    updateData.sections = sanitizeSections(updateData.sections);
  }
  const resume = await Resume.findOneAndUpdate(
    { _id: resumeId },
    { $set: updateData },
    { returnDocument: 'after' }
  );
  if (!resume) {
    const error = new Error('Resume not found.');
    error.statusCode = 404;
    throw error;
  }
  return resume;
};

export const updateSection = async (resumeId, sectionName, sectionData) => {
  const arrayFields = ['experience', 'education', 'projects', 'certifications'];
  let cleanData = sectionData;
  if (arrayFields.includes(sectionName) && Array.isArray(sectionData)) {
    cleanData = sectionData.map(({ _id, ...rest }) => {
      if (_id && mongoose.Types.ObjectId.isValid(_id)) {
        return { _id, ...rest };
      }
      return rest;
    });
  }
  const updateKey = `sections.${sectionName}`;
  const resume = await Resume.findOneAndUpdate(
    { _id: resumeId },
    { $set: { [updateKey]: cleanData } },
    { returnDocument: 'after' }
  );
  if (!resume) {
    const error = new Error('Resume not found.');
    error.statusCode = 404;
    throw error;
  }
  return resume;
};

export const updateTemplate = async (resumeId, templateId) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: resumeId },
    { $set: { templateId } },
    { returnDocument: 'after' }
  );
  if (!resume) {
    const error = new Error('Resume not found.');
    error.statusCode = 404;
    throw error;
  }
  return resume;
};

export const createFromUpload = async (parsedSections, title = 'Uploaded Resume') => {
  const resume = await Resume.create({
    title,
    templateId: 'classic',
    sections: parsedSections,
  });
  return resume;
};

export const deleteResume = async (resumeId) => {
  const resume = await Resume.findOneAndDelete({ _id: resumeId });
  if (!resume) {
    const error = new Error('Resume not found.');
    error.statusCode = 404;
    throw error;
  }
  return resume;
};