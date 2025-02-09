import parser from 'body-parser';

export const bodyParser = (): void => {
  parser.urlencoded({ extended: false });
  parser.json();
};
