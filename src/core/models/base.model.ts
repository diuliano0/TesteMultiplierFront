import {Deserializable} from "../interfaces/deserializable.model";

export abstract class BaseModel {

    toArray() {
        return Object.keys(this).reduce((a, b) => a.concat(this[b]), []);
    }

}
