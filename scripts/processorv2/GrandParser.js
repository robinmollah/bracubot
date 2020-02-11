
class GrandParser {
    constructor(){
        this.parser = [];
        this.parseResult = [];
    }

    parse(word){
        /*
        Example parseResult:
        [
            {intent: 'room'},
            {course_code: 'cse111'},
            {section: 1}
        ]
         */
        for(let parser of this.parser){
            this.parseResult.push(parse(word));
        }
        return this.parseResult;
    }

    add(parser){
        // TODO don't push if same parser already exist
        this.parser.push(parser);
    }

    remove(parser){
        for(let i = 0; i < this.parser.length; i++){
            if(typeof this.parser[i] == parser){
               this.parser.splice(i, 1);
               return true;
            }
        }
        return false;
    }

    doesContain(parserType){
        for(let parser of this.parser){
            if(typeof parser == parserType){
                return true;
            }
        }
        return false;
    }

    toQuery(){
        // TODO convert the this.parseResult to query
        /*
        Example Query:
        {intent: 'room',
         course_code: 'cse111',
         section: 1}
         */
    }
}