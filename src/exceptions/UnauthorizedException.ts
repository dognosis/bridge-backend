import HttpExpception from "./HttpException";

class UnauthorizedException extends HttpExpception {
  constructor() {
    super(401, "Please sign in to continue");
  }
}

export default UnauthorizedException;
