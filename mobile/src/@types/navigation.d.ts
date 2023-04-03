export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;  // we are using this as undefined cause we dont need any params to open/use this route
      new: undefined;
      habit: {
        date: string; // here, we need a param. when the user select a square of a day, we wanna to bring the specfic date of this selected square
      }
    }
  }
}