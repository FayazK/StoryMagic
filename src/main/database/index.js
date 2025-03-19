import DatabaseOperations from './operations';

const initialize = () => DatabaseOperations.initialize();
const isInitialized = () => DatabaseOperations.isInitialized();
const close = () => DatabaseOperations.close();
const insertDefaultTemplates = () => DatabaseOperations.insertDefaultTemplates();

export { initialize, isInitialized, close, insertDefaultTemplates };
