exports.pagination = (q, add_options) => {

	const page = q.page || 1;
	const limit = q.limit || 10;
	const sort_by = q.sort_by;
	const asc = q.asc || 1;
	const start = q.start;
	const end = q.end;
	const filter_by = q.filter_by;
	const filter_with = q.filter_with;
	const search_by = q.search_by;
	const search = q.search || '';


	const options = {
	page: page,
	limit: limit,
	customLabels: {
		docs: 'data',
		totalDocs: 'count',
	}, 
	...add_options //if there is additional options unique in that model
	}

	if(sort_by) options.sort = {[sort_by]: asc};

	const query = {};
	if(search) query[search_by] = new RegExp(`.*${search}.*`, 'gi') //search_by=name&search=burger
	if(filter_by && filter_with) query[filter_by] = filter_with //filter_by=completed&filter_with=true
	if(start) query['createdAt'] = { $gte : start } //start=2020-07-31
	if(start && end) query['createdAt'] = { $gte: start, $lte: end } //start=2020-07-31&end=2020-08-10

	return { query, options }
}