class ApiFeatures {
    constructor(query , querystr) {
        this.query = query;
        this.querystr = querystr;
    }
    search() {
        const keyword = this.querystr.keyword ? {
            name : {
                $regex : this.querystr.keyword,
                $options : "i"
            },
        }: {}
        this.query = this.query.find({...keyword}) //If we directly write keyword it get reference of that object ,Jo ki name hai and oo name change hooyega work nhi krega {Thats why spread operator use kita ...keyword to get full object 2nd copy}
        return this
    }
    filter() {
        const queryCopy = {...this.querystr};

        const removeFields = ["keyword" , "page" , "limit"] //Remoing so, that filter krde waqt , url te faltu keyword yaa page number show na kre | 
        removeFields.forEach((key) => delete queryCopy[key]) //Removed fields from this when using filter

        //Filter for price 
        let querystr = JSON.stringify(queryCopy); // Created string of the object queryCopy 
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`) // gt |gte | lt | lte are operators and because its being used in mongoDB too so, added $dollar sign 

        //Find the product lying between price and also category applied
        this.query = this.query.find(JSON.parse(querystr));

        return this
    }
    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this
    }
}

module.exports = ApiFeatures;