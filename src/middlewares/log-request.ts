import morgan from 'morgan';

export default morgan(':method :url :status :res[content-length] - :response-time ms');
