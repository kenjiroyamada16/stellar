const stringToBool = (key?: string): boolean => {
  if (key == 'true') {
    return true;
  } else {
    return false;
  }
}

export default stringToBool;