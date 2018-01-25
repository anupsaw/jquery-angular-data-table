
/**
 * This software is the confidential and proprietary information of
 * eHarmony Inc. and may not be used, reproduced, modified, distributed,
 * publicly displayed or otherwise disclosed without the express written
 * consent of eHarmony Inc. 
 * 
 * This software is a work of authorship by eHarmony Inc and protected by
 * the copyright laws of the United States and foreign jurisdictions.
 *  
 * Copyright 2000-2014 eharmony.com, Inc. All rights reserved.
 */

(function () {
  var AbstractBaseService, Constants, Middleware, SearchService, async, lodash, mobile_detect, moment, _, MyjsonData,
    __bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  AbstractBaseService = require('../common/AbstractBaseService').AbstractBaseService;

  Constants = require('../../Constants');

  lodash = require('lodash');

  async = require('async');

  mobile_detect = require('mobile-agent');

  Middleware = require('../../util/Middleware');

  moment = require('moment');

  _ = require('underscore');

  MyjsonData = { "data": [{ "PersonID": "2546562", "FirstName": "Matt", "MI": "Accountant", "LastName": "Reidy", "Title": "Senior Director", "Company": "Cisco Systems", "Street": "", "City": "Reston", "State": "VA", "Zip": "20191", "Country": "US", "Phone1": "4651337894", "Email1": "MReidy@cisco.com" }, { "PersonID": "2846564", "FirstName": "fghgfh", "MI": "utyutyu", "LastName": "gfhfh", "Title": "gffhfh", "Company": "fhfhfh", "Street": "fgghfh", "City": "ggfhfh", "State": "VA", "Zip": "20131", "Country": "US", "Phone1": "7686768876", "Email1": "DReidy@cisco.com" }, { "PersonID": "6741234", "FirstName": "gfgf", "MI": "jhkhk", "LastName": "ghfghfh", "Title": "ghjghjh", "Company": "ghjghjgj", "Street": "ghgj", "City": "gjgj", "State": "jhj", "Zip": "67435", "Country": "US", "Phone1": "4567892345", "Email1": "sdsd@cisco.com" }, { "PersonID": "6743575", "FirstName": "ghfhg", "MI": "ghfghgfh", "LastName": "ghfgh", "Title": "ghgh Director", "Company": "sdsd Systems", "Street": "kjk", "City": "Reston", "State": "VA", "Zip": "78768", "Country": "US", "Phone1": "2131231332", "Email1": "kjhk@cisco.com" }, { "PersonID": "7657655", "FirstName": "hfgh", "MI": "ghfhf", "LastName": "kjkk", "Title": "assa Director", "Company": "lkjkl Systems", "Street": "dgdg", "City": "Reston", "State": "VA", "Zip": "34325", "Country": "US", "Phone1": "4651337812", "Email1": "rewsd@cisco.com" }, { "PersonID": "3452346", "FirstName": "nbv", "MI": "zxx", "LastName": "cxcc", "Title": "hksd Director", "Company": "xchgg Systems", "Street": "ghgfh", "City": "Reston", "State": "VAdfd", "Zip": "23544", "Country": "US", "Phone1": "435366346", "Email1": "oiy@cisco.com" }, { "PersonID": "657567", "FirstName": "vvcfdg", "MI": "fgggh", "LastName": "fgfhgh", "Title": "klghfg Director", "Company": "vbn Systems", "Street": "gfggh", "City": "jghh", "State": "gg", "Zip": "46886", "Country": "US", "Phone1": "7567576436", "Email1": "kjhkjh@cisco.com" }, { "PersonID": "5645346", "FirstName": "ghfhfg", "MI": "sdfssdf", "LastName": "fghfh", "Title": "hjghjh Director", "Company": "vcbbv Systems", "Street": "mjghjg", "City": "hjgj", "State": "xcv", "Zip": "87567", "Country": "US", "Phone1": "7645767655", "Email1": "asdas@cisco.com" }, { "PersonID": "4745744", "FirstName": "hgkgk", "MI": "vcbdf", "LastName": "fghgjk", "Title": "wesd Director", "Company": "zxc Systems", "Street": "gnh", "City": "wer", "State": "hhg", "Zip": "45634", "Country": "US", "Phone1": "345357468", "Email1": "jkjkj@cisco.com" }, { "PersonID": "4613625", "FirstName": "qwewqe", "MI": "jkjhkh", "LastName": "gfdgd", "Title": "nvnbmm Director", "Company": "asddd Systems", "Street": "fdfd", "City": "fdff", "State": "kjl", "Zip": "47744", "Country": "US", "Phone1": "3666646874", "Email1": "ljklkl@cisco.com" }, { "PersonID": "8575654", "FirstName": "hjll", "MI": "zzxcc", "LastName": "lhkyu", "Title": "ljkljl Director", "Company": "vxcv Systems", "Street": "hjghj", "City": "jghjh", "State": "VA", "Zip": "56754", "Country": "US", "Phone1": "xfgfg", "Email1": "khkhk@cisco.com" }, { "PersonID": "6585854", "FirstName": "Dkhkhk", "MI": "Vkjhk", "LastName": "Shjhk", "Title": "jlkjk Director", "Company": "fghfgh Systems", "Street": "ghgh", "City": "khffgh", "State": "VA", "Zip": "67577", "Country": "India", "Phone1": "2432564367", "Email1": "hjkk@cisco.com" }, { "PersonID": "4567456", "FirstName": "fghgfh", "MI": "fghgh", "LastName": "fhgh", "Title": "hgjjj Director", "Company": "hjdgdg Systems", "Street": "gfgh", "City": "mbnmbm", "State": "VA", "Zip": "47546", "Country": "US", "Phone1": "3467535645", "Email1": "xfgdgdg@cisco.com" }, { "PersonID": "5476457", "FirstName": "cfgh", "MI": "fjhhgjg", "LastName": "tyutyu", "Title": "asddsd Director", "Company": "nmbvh Systems", "Street": "rtdfdf", "City": "dtg", "State": "VA", "Zip": "67765", "Country": "US", "Phone1": "4564566466", "Email1": "qassa@cisco.com" }, { "PersonID": "567657", "FirstName": "fghfgh", "MI": "mgvgf", "LastName": "asdds", "Title": "vbnn Director", "Company": "wewee Systems", "Street": "fdgdfg", "City": "uiyuiui", "State": "xcv", "Zip": "57445", "Country": "US", "Phone1": "3463656456", "Email1": "kjhhjk@cisco.com" }, { "PersonID": "5465755", "FirstName": "Khgjhgj", "MI": "Hfgh", "LastName": "Enbvhg", "Title": "jhk Director", "Company": "jkhk Systems", "Street": "jhkhk", "City": "fggjf", "State": "VA", "Zip": "65756", "Country": "US", "Phone1": "3454353666", "Email1": "jkhjkjk@cisco.com" }] };



  /*
  @class SearchService class that calls up service layer for operation
  related to Location
   */

  SearchService = (function (_super) {
    __extends(SearchService, _super);

    SearchService.include(Constants);

    function SearchService(config, logger, data_objects, app, errors) {
      this.saved_search_listings = __bind(this.saved_search_listings, this);
      this.format_js_results = __bind(this.format_js_results, this);
      this.process_js_results = __bind(this.process_js_results, this);
      this.process_js_init = __bind(this.process_js_init, this);
      this.process_compatibility = __bind(this.process_compatibility, this);
      this.format_hc_results = __bind(this.format_hc_results, this);
      this.process_hc_results = __bind(this.process_hc_results, this);
      this.add_profile_url_hc = __bind(this.add_profile_url_hc, this);
      this.add_profile_url_js = __bind(this.add_profile_url_js, this);
      this.process_hc_init = __bind(this.process_hc_init, this);
      this.listing_view = __bind(this.listing_view, this);
      this.listing_apply = __bind(this.listing_apply, this);
      this.listing_save = __bind(this.listing_save, this);
      this.listing_report = __bind(this.listing_report, this);
      this.listing_remove = __bind(this.listing_remove, this);
      this.criteria_content = __bind(this.criteria_content, this);
      this.criteria_delete = __bind(this.criteria_delete, this);
      this.criteria_edit = __bind(this.criteria_edit, this);
      this.criteria_save = __bind(this.criteria_save, this);
      this.search_records = __bind(this.search_records, this);
      this.search_refactor = __bind(this.search_refactor, this);
      this.search = __bind(this.search, this);
      this.get_datatable = __bind(this.get_datatable, this);
      this.filterRecords = __bind(this.filterRecords, this);
      this.sort_by_colName = __bind(this.sort_by_colName, this);
      this.getPaginatedItems = __bind(this.getPaginatedItems, this);
      this.get_data = __bind(this.get_data, this);
      this.build_routes = __bind(this.build_routes, this);
      var searchConfig, searchDataModel;
      searchDataModel = require('../../' + config.common.model_dir + '/search/search.js');
      searchConfig = require('../../' + config.common.model_dir + '/search/search.page.config.js');
      SearchService.__super__.constructor.call(this, config, logger, data_objects, app, errors, searchConfig, searchDataModel);
      this.middleware = new Middleware(config, logger, data_objects, app, errors);
      this.searchData = data_objects.searchData, this.answerData = data_objects.answerData, this.questionnaireData = data_objects.questionnaireData, this.jobData = data_objects.jobData, this.photoData = data_objects.photoData, this.userData = data_objects.userData, this.scoreData = data_objects.scoreData;
    }

    SearchService.prototype.build_routes = function () {
      SearchService.__super__.build_routes.apply(this, arguments);
      this.route_get('/search', this.search_refactor);
      this.route_post('/search/results/:start/:size', this.search_records);
      this.route_post('/search/results/', this.search_records);
      this.route_post('/search/criteria', this.criteria_save);
      this.route_put('/search/criteria', this.criteria_edit);
      this.route_delete('/search/criteria/:id', this.criteria_delete);
      this.route_get('/search/criteria/:id', this.criteria_content);
      this.route_put('/searchaction/listing/:id/:flag/remove', this.middleware.ensure_subscribed, this.listing_remove);
      this.route_put('/searchaction/listing/:id/:flag/report', this.middleware.ensure_subscribed, this.listing_report);
      this.route_put('/searchaction/listing/:id/:flag/save', this.middleware.ensure_subscribed, this.listing_save);
      this.route_put('/searchaction/listing/:id/:flag/apply', this.middleware.ensure_subscribed, this.listing_apply);
      this.route_put('/searchaction/listing/:id/:flag/view', this.middleware.ensure_subscribed, this.listing_view);
      this.route_get('/get_data', this.get_data);
      this.route_post('/get_datatable', this.get_datatable);
      return this.route_get('/search/savedsearches', this.saved_search_listings);
    };

    SearchService.prototype.search = function (req, res) {
      var agent, correlation_id, criteria, environment_value, profile_builder_id, profile_builder_json, self, size;
      correlation_id = req.headers['correlation_id'];
      agent = mobile_detect(req.headers['user-agent']);
      size = agent.Mobile ? this.config.mobile_result_size : this.config.desktop_result_size;
      if (req.query.size) {
        size = req.query.size;
      }
      criteria = {
        start: this.result_start_index,
        size: size,
        user: req.user,
        auth: req.cookies.auth,
        flow: "SEARCH"
      };
      self = this;
      environment_value = req.user.account_type.toUpperCase() === self.account_type_js ? self.config.common.environment_js : self.config.common.environment_hc;
      criteria.store_lss = true;
      criteria.initial_load = true;
      if (req.user.account_type === this.account_type_hc) {
        return this.process_hc_init(criteria, this.account_type_js, req.user.account_id, req.user.status, correlation_id, function (err, search_results) {
          var path;
          if (err != null) {
            return self.route_error_message(correlation_id, "error/error_system", res, err);
          } else {
            path = 'search_query_builder/search_query_builder_HC_Custom';
            self.logger.debug(correlation_id, " - UI results - ", search_results);
            if ((search_results != null ? search_results.correlation_id : void 0) != null) {
              res.setHeader('correlation_id', search_results.correlation_id);
            }
            return res.render(path, {
              search_results: search_results,
              user_type: req.user.account_type,
              is_loggedin: true,
              environment: environment_value
            });
          }
        });
      } else {
        profile_builder_json = {};
        profile_builder_id = req.user.account_id;
        lodash.find(req.user.questionnaires, function (_questionnaires) {
          if (_questionnaires.questionnaire_type === self.questionnaire_type_profile) {
            profile_builder_json = _questionnaires.questionnaire_json;
          }
        });
        profile_builder_json.id = profile_builder_id;
        return this.process_js_init(criteria, this.account_type_hc, profile_builder_json, correlation_id, function (err, search_results) {
          var path;
          if (err) {
            return self.route_error_message(correlation_id, "error/error_system", res, err);
          } else {
            search_results.resume_completion = req.user.resume_completion;
            search_results.profile_completion = JSON.stringify(req.user.profile_completion);
            path = 'search_query_builder/search_query_builder_JS';
            return self._build_cta_data(req.user, search_results, correlation_id, function (err, search_results_response) {
              if (err != null) {
                return self.route_error_message(correlation_id, "error/error_system", res, err);
              } else {
                self.logger.debug(correlation_id, " - UI results - ", search_results_response);
                if ((search_results != null ? search_results.correlation_id : void 0) != null) {
                  res.setHeader('correlation_id', search_results.correlation_id);
                }
                return res.render(path, {
                  search_results: search_results_response,
                  user_type: req.user.account_type,
                  is_loggedin: true,
                  environment: environment_value
                });
              }
            });
          }
        });
      }
    };

    SearchService.prototype.search_refactor = function (req, res) {
      var account_id, account_type, agent, correlation_id, criteria, is_logged_in, self, size;
      self = this;
      correlation_id = req.headers['correlation_id'];
      this.logger.debug(correlation_id, 'search_refactor entry');
      is_logged_in = !!req.user;
      agent = mobile_detect(req.headers['user-agent']);
      account_type = req.user.account_type.toLowerCase();
      account_id = req.user.account_id;
      size = req.query.size || (agent.Mobile ? this.config.mobile_result_size : this.config.desktop_result_size);
      criteria = {
        start: this.result_start_index,
        size: size,
        user: req.user,
        auth: req.cookies.auth,
        flow: "SEARCH"
      };
      criteria.store_lss = true;
      criteria.initial_load = true;
      if (req.user.account_type === this.account_type_hc) {
        this.process_hc_init(criteria, this.account_type_js, account_id, req.user.status, correlation_id, function (err, search_results) {
          var path;
          if (err != null) {
            return self.route_error_message(correlation_id, "error/error_system", res, err);
          } else {
            path = 'search_query_builder/search_query_builder_HC_Custom';
            self.logger.debug(correlation_id, " - UI results - ", search_results);
            if ((search_results != null ? search_results.correlation_id : void 0) != null) {
              res.setHeader('correlation_id', search_results.correlation_id);
            }
            return res.render(path, {
              search_results: search_results,
              user_type: account_type,
              is_loggedin: true,
              environment: self.config.common.environment_hc
            });
          }
        });
      } else {
        async.parallel([
          function (callback) {
            var profile_builder_id, profile_builder_json;
            profile_builder_json = {};
            profile_builder_id = account_id;
            lodash.find(req.user.questionnaires, function (_questionnaires) {
              if (_questionnaires.questionnaire_type === self.questionnaire_type_profile) {
                profile_builder_json = _questionnaires.questionnaire_json;
              }
            });
            profile_builder_json.id = profile_builder_id;
            return self.process_js_init(criteria, self.account_type_hc, profile_builder_json, correlation_id, function (err, search_results) {
              if (err) {
                return self.route_error_message(correlation_id, "error/error_system", res, err);
              } else {
                search_results.resume_completion = req.user.resume_completion;
                search_results.profile_completion = JSON.stringify(req.user.profile_completion);
                return self._build_cta_data(req.user, search_results, correlation_id, function (err, search_results_response) {
                  if (err != null) {
                    return self.route_error_message(correlation_id, "error/error_system", res, err);
                  } else {
                    self.logger.debug(correlation_id, " - UI results - ", search_results_response);
                    return callback(null, search_results_response);
                  }
                });
              }
            });
          }, function (callback) {
            return self.userData.get_candidate(account_id, correlation_id, function (error, candidate_data) {
              var params;
              if (error != null) {
                self.logger.error(correlation_id, 'get_resume_preview_data - Error in getting candidate data!');
                return self.route_error_express(correlation_id, res, error);
              } else {
                self.logger.debug(correlation_id, 'candidate data retreived!');
                params = {
                  listings: []
                };
                if ((candidate_data != null ? candidate_data.gender : void 0) != null) {
                  self.logger.debug(correlation_id, 'get_profile_photo: candidate gender: ', candidate_data.gender);
                  params.listings.push({
                    account_id: account_id,
                    type: account_type,
                    gender: candidate_data.gender
                  });
                } else {
                  self.logger.debug(correlation_id, 'get_profile_photo: candidate gender not available!');
                  params.listings.push({
                    account_id: account_id,
                    type: account_type,
                    gender: void 0,
                    image_type: self.s3_header_photo_idenfier
                  });
                }
                return self.photoData.get_profile_photo(params, correlation_id, function (err, data) {
                  if (err != null) {
                    return callback(err);
                  } else {
                    return callback(null, data);
                  }
                });
              }
            });
          }
        ], function (err, results) {
          var config, path, _ref, _ref1;
          if (err != null) {
            self.logger.error(correlation_id, 'search - error in search page data retrieval');
            return self.route_error(correlation_id, res, err);
          } else {
            path = "../src/server/search/search_builder.hbs";
            config = {
              title: "Search Results",
              user_type: account_type,
              is_loggedin: is_logged_in,
              isLoggedIn: is_logged_in,
              environment: self.config.common.environment_js,
              links: self.pageConfig.links,
              scripts: self.pageConfig.scripts,
              meta: self.pageConfig.meta,
              ogMeta: self.pageConfig.ogMeta,
              footerScripts: self.pageConfig.footerScripts,
              root: self.rootData,
              userName: req.user.name,
              photoUrl: ((_ref = results[1][0]) != null ? _ref.photo_url : void 0) != null ? results[1][0].photo_url : null
            };
            if (((_ref1 = results[0]) != null ? _ref1.correlation_id : void 0) != null) {
              res.setHeader('correlation_id', results[0].correlation_id);
            }
            return res.render(path, {
              layout: 'root.hbs',
              config: config,
              search_results: JSON.stringify(results[0])
            });
          }
        });
      }
    };

    SearchService.prototype.search_records = function (req, res) {
      var agent, correlation_id, criteria, search_results, self, size;
      correlation_id = req.headers['correlation_id'];
      search_results = {};
      if ((req.body != null) && ((req.body.criteria != null) || (req.body.job_id != null) || (req.body.search_id != null))) {
        criteria = req.body;
        criteria.initial_job_search = req.user.account_type === this.account_type_hc && (req.body.job_id != null) && (req.body.criteria == null) ? true : false;
        agent = mobile_detect(req.headers['user-agent']);
        size = agent.Mobile ? this.config.mobile_result_size : this.config.desktop_result_size;
        criteria.start = req.params.start != null ? req.params.start : this.result_start_index;
        criteria.size = req.params.size != null ? req.params.size : size;
        criteria.user = req.user;
        criteria.auth = req.cookies.auth;
        criteria.flow = "SEARCH";
        criteria.store_lss = criteria.src === 'SS' ? false : true;
        self = this;
        if (req.user.account_type === this.account_type_hc) {
          criteria.include_hidden = true;
          return async.waterfall([
            function (callback) {
              return self.jobData.job_details(criteria, correlation_id, function (err, jobs) {
                self.logger.debug(correlation_id, "List of jobs received", jobs);
                if ((err != null) && err.type === self.err_not_found) {
                  return callback(null, false);
                } else {
                  if (err) {
                    return callback(err);
                  } else {
                    return callback(null, true);
                  }
                }
              });
            }, function (job_present_for_hc, callback) {
              criteria.job_present_for_hc = job_present_for_hc;
              return self.searchData.get_candidate_results(criteria, correlation_id, function (error, search_records) {
                if (error) {
                  return callback(error);
                } else {
                  self.logger.debug(correlation_id, "Search Results: ", search_records);
                  return callback(null, search_records);
                }
              });
            }, function (search_records, callback) {
              if ((search_records != null) && (search_records.results != null) && search_records.results.hits > 0) {
                return self.add_profile_url_hc(search_records, self.account_type_js, correlation_id, (function (_this) {
                  return function (error, photo_data) {
                    if (error) {
                      self.logger.error(correlation_id, "search_records - Error in fetching image");
                      return callback(null, [], search_records);
                    } else {
                      return callback(null, photo_data, search_records);
                    }
                  };
                })(this));
              } else {
                return callback(null, [], search_records);
              }
            }, function (photo_data, search_records, callback) {
              return self.searchData.user_candidate_state(criteria.user.account_id, correlation_id, function (error, candidate) {
                if (error) {
                  return callback(error);
                } else {
                  search_results = self.format_hc_results(search_records, photo_data, candidate, null, req.user.status);
                  return callback(null, search_results);
                }
              });
            }
          ], function (err, search_results) {
            if (err) {
              return self.route_error_express(correlation_id, res, err);
            } else {
              search_results.correlation_id = correlation_id;
              self.logger.debug(correlation_id, "UI Search Results: ", search_results);
              return res.send(search_results);
            }
          });
        } else {
          return async.waterfall([
            function (callback) {
              var params, _ref, _ref1;
              if ((criteria != null ? (_ref = criteria.criteria) != null ? _ref.willing_to_travel : void 0 : void 0) != null) {
                params = {
                  id: criteria.user.account_id,
                  doc: {
                    willing_to_travel: (_ref1 = criteria.criteria.willing_to_travel === "true" || criteria.criteria.willing_to_travel === true) != null ? _ref1 : {
                      "true": false
                    }
                  },
                  correlation_id: correlation_id
                };
                return self.userData.update_candidate_elastic(params, function (err, update_response) {
                  if (err) {
                    return callback(err);
                  } else {
                    self.logger.debug(correlation_id, "update_candidate is successful", update_response);
                    return callback(null, update_response);
                  }
                });
              } else {
                return callback(null, null);
              }
            }, function (candidate_update, callback) {
              return self.searchData.get_job_results(criteria, correlation_id, function (error, search_records) {
                if (error) {
                  return callback(error);
                } else {
                  self.logger.debug(correlation_id, "Search Results: ", search_records);
                  return callback(null, search_records);
                }
              });
            }, function (search_records, callback) {
              var generic_info;
              if ((search_records != null) && (search_records.results != null) && search_records.results.hits > 0) {
                generic_info = self._determine_subscription(criteria.user, correlation_id);
                if (generic_info) {
                  return self.photoData.get_default_images(correlation_id, self.identifier_company, function (error, default_image) {
                    if (error) {
                      self.logger.error(correlation_id, "search_records - Error in fetching default image for account id: " + criteria.user.account_id);
                      return callback(null, [], search_records, generic_info);
                    } else {
                      return callback(null, default_image, search_records, generic_info);
                    }
                  });
                } else {
                  return self.add_profile_url_js(search_records, self.account_type_hc, correlation_id, (function (_this) {
                    return function (error, photo_data) {
                      if (error) {
                        self.logger.error(correlation_id, "search_records - Error in fetching image");
                        return callback(null, [], search_records, generic_info);
                      } else {
                        return callback(null, photo_data, search_records, generic_info);
                      }
                    };
                  })(this));
                }
              } else {
                return callback(null, [], search_records, null);
              }
            }, function (photo_data, search_records, generic_info, callback) {
              return self.searchData.user_job_state(criteria.user.account_id, correlation_id, function (error, jobs) {
                if (error) {
                  return callback(error);
                } else {
                  search_results = self.format_js_results(generic_info, search_records, photo_data, jobs);
                  return callback(null, search_results);
                }
              });
            }
          ], function (err, search_results) {
            if (err) {
              return self.route_error_express(correlation_id, res, err);
            } else {
              search_results.profile_completion = JSON.stringify(req.user.profile_completion);
              search_results.resume_completion = req.user.resume_completion;
              return self._build_cta_data(req.user, search_results, correlation_id, function (err, search_results_response) {
                if (err != null) {
                  return self.route_error_express(correlation_id, res, err);
                } else {
                  search_results_response.correlation_id = correlation_id;
                  self.logger.debug(correlation_id, "UI Search Results: ", search_results_response);
                  return res.send(search_results_response);
                }
              });
            }
          });
        }
      } else {
        return this.route_error_express(correlation_id, res, this.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype._build_cta_data = function (user_object, locale, correlation_id, callback) {
      var profile_builder_id, profile_builder_json, questionnaire_id, self;
      self = this;
      this.logger.debug(correlation_id, '_build_cta_data - Entry ');
      self = this;
      profile_builder_json = {};
      profile_builder_id = user_object.account_id;
      lodash.find(user_object.questionnaires, function (_questionnaires) {
        if (_questionnaires.questionnaire_type === self.questionnaire_type_profile) {
          profile_builder_json = _questionnaires.questionnaire_json;
        }
      });
      questionnaire_id = self.delimitify_questionnaire_versions(profile_builder_json, correlation_id);
      profile_builder_json.id = profile_builder_id;
      self.logger.debug(correlation_id, "_build_cta_data - profile_builder_id : ", profile_builder_id);
      return async.waterfall([
        function (callback) {
          self.logger.debug(correlation_id, '_build_cta_data - Calling answer service - profilebuilder_start cta');
          return self.answerData.get_answer_id(user_object.account_id, questionnaire_id, correlation_id, function (err, answer_id_data) {
            if (err != null) {
              return callback(err);
            } else {
              if ((answer_id_data != null ? answer_id_data.answer_id : void 0) != null) {
                locale.profilebuilder_start = answer_id_data.last_saved_present;
                locale.profile_builder_answer_id = answer_id_data.answer_id;
                return callback(null, locale);
              } else {
                locale.profilebuilder_start = false;
                return callback(null, locale);
              }
            }
          });
        }, function (locale, callback) {
          self.logger.debug(correlation_id, '_build_cta_data - Calling profile answer get - qid count');
          if (locale.profile_builder_answer_id != null) {
            return self.answerData.get_answers(locale.profile_builder_answer_id, correlation_id, function (err, answer_data) {
              if (err != null) {
                return callback(err);
              } else {
                locale.profile_builder_answer_count = self.get_answer_count(answer_data, correlation_id);
                return callback(null, locale);
              }
            });
          } else {
            return callback(null, locale);
          }
        }, function (locale, callback) {
          var section_id;
          self.logger.debug(correlation_id, '_build_cta_data - Calling questionnaire service - profilebuilder section mapping');
          section_id = null;
          return self.questionnaireData.get_formated_questionnaire(user_object, profile_builder_json, section_id, correlation_id, function (err, question_data) {
            if (err != null) {
              return callback(err);
            } else {
              if ((question_data != null ? question_data.section_id_mapping : void 0) != null) {
                locale.profile_section_mapping = question_data.section_id_mapping;
              }
              return callback(null, locale);
            }
          });
        }
      ], function (err, results) {
        if (err != null) {
          return callback(err);
        } else {
          self.logger.debug(correlation_id, "_build_cta_data - Final response ", results);
          return callback(null, results);
        }
      });
    };

    SearchService.prototype.get_answer_count = function (answer_data, correlation_id) {
      var profile_builder_answer_count, self, _i, _len, _ref, _section;
      self = this;
      self.logger.debug(correlation_id, 'get_answer_count - entry');
      profile_builder_answer_count = {};
      _ref = answer_data.section;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _section = _ref[_i];
        profile_builder_answer_count[_section.id] = _section.page.length;
      }
      self.logger.debug(correlation_id, 'get_answer_count - profile_builder_answer_count - ', profile_builder_answer_count);
      return profile_builder_answer_count;
    };

    SearchService.prototype.criteria_save = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      if (req.body != null) {
        criteria = req.body;
        criteria.user = req.user;
        self = this;
        return this.searchData.insert_saved_search(criteria, correlation_id, function (error, data) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send(data);
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.criteria_edit = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      if (req.body != null) {
        criteria = req.body;
        criteria.user = req.user;
        self = this;
        return this.searchData.update_saved_search(criteria, correlation_id, function (error, data) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send(data);
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.criteria_delete = function (req, res) {
      var correlation_id, self;
      correlation_id = req.headers['correlation_id'];
      if (req.params.id != null) {
        self = this;
        return this.searchData.delete_saved_search(req.params.id, correlation_id, function (error, data) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send(data);
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.criteria_content = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      if (req.params.id != null) {
        criteria = {
          user: req.user
        };
        self = this;
        return this.searchData.search_criteria(req.params.id, criteria, correlation_id, function (error, search_criteria) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send(search_criteria);
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.listing_remove = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      this.logger.debug(correlation_id, "listing_remove - Entry");
      if (req.params.id != null) {
        self = this;
        criteria = {
          account_id: req.user.account_id,
          remove_flag: req.params.flag,
          auth: req.cookies.auth,
          type: "search",
          notified: req.query.compatibility,
          search_id: req.query.search_id,
          posting_type: req.query.type,
          source_id: req.query.source_id
        };
        if (req.query.rank) {
          criteria.rank = req.query.rank;
        }
        return this.searchData.remove_listing(req.params.id, req.user.account_type, criteria, correlation_id, function (error, data) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send({
              "success": "Y"
            });
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.listing_report = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      if ((req.params.id != null) && req.user.account_type === this.account_type_js) {
        criteria = {
          account_id: req.user.account_id,
          report_flag: req.params.flag,
          auth: req.cookies.auth,
          type: "search",
          search_id: req.query.search_id,
          posting_type: req.query.type,
          source_id: req.query.source_id
        };
        if (req.query.rank) {
          criteria.rank = req.query.rank;
        }
        self = this;
        return this.searchData.report_listing(req.params.id, criteria, correlation_id, function (error, data) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send({
              "success": "Y"
            });
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.listing_save = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      this.logger.debug(correlation_id, "Listing saving for ", req.user.account_id, req.params.flag, req.url, req.query.job_id);
      if (req.params.id != null) {
        criteria = {
          account_id: req.user.account_id,
          save_flag: req.params.flag,
          auth: req.cookies.auth,
          updated_timestamp: moment(new Date()).format('YYYY-MM-DD'),
          type: "search",
          search_id: req.query.search_id,
          posting_type: req.query.type,
          source_id: req.query.source_id
        };
        if (req.query.rank) {
          criteria.rank = req.query.rank;
        }
        self = this;
        return async.waterfall([
          function (callback) {
            var data, param;
            param = {};
            if (req.user.account_type === self.account_type_js) {
              if (req.user.resume_completion === true) {
                param.view = self.job_seeker;
                param.source = self.saved_jobs.toUpperCase();
                data = {
                  "job_seeker_id": req.user.account_id,
                  "job_listing_id": req.params.id
                };
                param.data = [data];
                return callback(null, false, param);
              } else {
                return callback(null, true, null);
              }
            } else {
              criteria.user = req.user;
              return self.jobData.job_details(criteria, correlation_id, function (err, jobs) {
                self.logger.debug(correlation_id, "List of jobs received", jobs);
                if ((err != null) && err.type === self.err_not_found) {
                  return callback(null, true, null);
                } else {
                  if (err) {
                    return callback(err);
                  } else {
                    param.view = self.hiring_company;
                    param.source = self.saved_candidate.toUpperCase();
                    data = {
                      job_seeker_id: req.params.id
                    };
                    if (lodash.isEmpty(req.query.job_id)) {
                      data.company_id = req.user.company_id;
                      criteria.job_id = null;
                    } else {
                      criteria.job_id = req.query.job_id;
                      data.job_listing_id = req.query.job_id;
                    }
                    param.data = [data];
                    return callback(null, false, param);
                  }
                }
              });
            }
          }, function (skip, param, callback) {
            if (skip === true) {
              return callback(null, true, null);
            } else {
              param.save = true;
              return self.scoreData.get_score(param, correlation_id, (function (_this) {
                return function (error, score_ids) {
                  if (error) {
                    self.logger.error(correlation_id, "listing_save - Error in fetching score id");
                    return callback(error);
                  } else {
                    return callback(null, false, score_ids[0].score_id);
                  }
                };
              })(this));
            }
          }, function (skip, score_id, callback) {
            criteria.score_id = skip === false ? score_id : null;
            return self.searchData.save_listing(req.params.id, req.user.account_type, criteria, correlation_id, function (error, data) {
              if (error) {
                return callback(error);
              } else {
                return callback(null, {
                  "success": "Y"
                });
              }
            });
          }
        ], function (err, save_response) {
          if (err) {
            return self.route_error_express(correlation_id, res, err);
          } else {
            return res.send(save_response);
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, self.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.listing_apply = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      self = this;
      if (req.user.account_id != null) {
        criteria = {
          account_id: req.user.account_id,
          apply_flag: req.params.flag,
          auth: req.cookies.auth,
          type: "search",
          search_id: req.query.search_id,
          posting_type: req.query.type,
          source_id: req.query.source_id
        };
        if (req.query.rank) {
          criteria.rank = req.query.rank;
        }
        this.logger.debug("apply_operation - calling searchData model ");
        return this.userData.listing_operations(req.params.id, req.user.account_type, criteria, correlation_id, function (err, data) {
          if (err != null) {
            return self.route_error_express(correlation_id, res, err);
          } else {
            self.logger.debug("apply_operation - Response received", data);
            return res.send({
              "success": "Y"
            });
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, this.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.listing_view = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      self = this;
      if (req.user.account_id != null) {
        criteria = {
          account_id: req.user.account_id,
          viewed_flag: req.params.flag,
          auth: req.cookies.auth,
          type: "search",
          search_id: req.query.search_id,
          posting_type: req.query.type,
          source_id: req.query.source_id
        };
        if (req.query.rank) {
          criteria.rank = req.query.rank;
        }
        this.logger.debug("listing_view - calling listing_operations model ");
        return self.userData.listing_operations(req.params.id, req.user.account_type, criteria, correlation_id, function (error, data) {
          if (error) {
            return self.route_error_express(correlation_id, res, error);
          } else {
            return res.send({
              success: true
            });
          }
        });
      } else {
        return this.route_error_express(correlation_id, res, this.errors.bad_request("" + this.bad_request));
      }
    };

    SearchService.prototype.process_hc_init = function (criteria, type, account_id, subscription_status, correlation_id, next) {
      var self;
      self = this;
      return async.waterfall([
        function (callback) {
          criteria.include_hidden = true;
          return self.jobData.job_details(criteria, correlation_id, function (err, jobs) {
            self.logger.debug(correlation_id, "List of jobs received", jobs);
            if ((err != null) && err.type === self.err_not_found) {
              return callback(null, true, []);
            } else {
              if (err) {
                return callback(err);
              } else {
                return callback(null, false, jobs);
              }
            }
          });
        }, function (process_custom_search, jobs, callback) {
          criteria.initial_load = true;
          if (!process_custom_search) {
            criteria.job_id = jobs[0].job_id;
          }
          criteria.job_present_for_hc = !process_custom_search;
          return self.searchData.get_candidate_results(criteria, correlation_id, function (error, search_records) {
            if (error) {
              return callback(error);
            } else {
              if (search_records.error_message) {
                return callback(self.errors.validation(search_records.error_message));
              } else {
                self.logger.debug(correlation_id, "Search Results: ", search_records);
                return callback(null, search_records, jobs);
              }
            }
          });
        }, function (search_records, jobs, callback) {
          return self.process_hc_results(criteria, search_records, type, subscription_status, correlation_id, function (error, search_records) {
            if (error) {
              return callback(error);
            } else {
              if (search_records.error_message) {
                return callback(self.errors.validation(search_records.error_message));
              } else {
                search_records.jobs = jobs;
                return callback(null, search_records);
              }
            }
          });
        }
      ], function (err, search_results) {
        if (err) {
          return next(err);
        } else {
          return next(null, search_results);
        }
      });
    };

    SearchService.prototype.add_profile_url_js = function (search_records, type, correlation_id, callback) {
      var args, record_array, record_json, records, self, _i, _len, _ref;
      self = this;
      record_array = [];
      _ref = search_records.results.records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        records = _ref[_i];
        record_json = {
          account_id: records.account_id,
          type: type,
          normalized_company_name: records.normalized_company_name
        };
        record_json.account_id_normalized_company_name = records.normalized_company_name != null ? records.account_id + this.slash + encodeURIComponent(records.normalized_company_name) : records.account_id;
        record_json.gender = records.gender != null ? records.gender : "Male";
        record_array.push(record_json);
      }
      args = {
        listings: record_array
      };
      return this.photoData.get_profile_photo(args, correlation_id, function (error, image_urls) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, image_urls);
        }
      });
    };

    SearchService.prototype.add_profile_url_hc = function (search_records, type, correlation_id, callback) {
      var args, record_array, record_json, records, self, _i, _len, _ref;
      self = this;
      record_array = [];
      _ref = search_records.results.records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        records = _ref[_i];
        record_json = {
          account_id: records.account_id,
          type: type
        };
        record_array.push(record_json);
      }
      args = {
        listings: record_array
      };
      self.logger.debug(correlation_id, "Request to profile pic", args);
      return this.photoData.get_profile_photo(args, correlation_id, function (error, image_urls) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, image_urls);
        }
      });
    };

    SearchService.prototype.process_hc_results = function (criteria, search_records, type, subscription_status, correlation_id, next) {
      var self;
      self = this;
      return async.parallel([
        function (callback) {
          if ((search_records != null) && (search_records.results != null) && search_records.results.hits > 0) {
            return self.add_profile_url_hc(search_records, type, correlation_id, (function (_this) {
              return function (error, photo_data) {
                if (error) {
                  self.logger.error(correlation_id, "process_hc_results - Error in fetching profile photo");
                  return callback(null, []);
                } else {
                  return callback(null, photo_data);
                }
              };
            })(this));
          } else {
            return callback(null, []);
          }
        }, function (callback) {
          return self.searchData.user_candidate_state(criteria.user.account_id, correlation_id, function (error, candidate) {
            if (error) {
              return callback(error);
            } else {
              if (candidate.error_message) {
                return callback(self.errors.validation(candidate.error_message));
              } else {
                return callback(null, candidate);
              }
            }
          });
        }, function (callback) {
          return self.searchData.save_search_details(criteria, correlation_id, function (error, search_names) {
            var filter, is_search_tab, locals;
            if (error) {
              return callback(error);
            } else {
              is_search_tab = false;
              filter = {
                search_id: search_records.search_id
              };
              is_search_tab = lodash.some(search_records.search_names, filter);
              locals = {
                search_names: search_names,
                is_search_tab: is_search_tab
              };
              return callback(null, locals);
            }
          });
        }
      ], function (err, results) {
        if (err) {
          return next(err);
        } else {
          return next(null, self.format_hc_results(search_records, results[0], results[1], results[2], subscription_status));
        }
      });
    };

    SearchService.prototype.format_hc_results = function (search_records, image_urls, candidates, search_names_data, subscription_status) {
      var filter, index, records, result, search_results, self, _candidate, _i, _len, _ref, _ref1;
      self = this;
      search_results = {
        search_id: search_records.search_id,
        correlation_id: search_records.correlation_id,
        search_type: search_records.search_type,
        eligible_for_score: search_records.eligible_for_score,
        sort_order: search_records.sort_order,
        job_id: search_records.job_id,
        eligible_sort_options: search_records.eligible_sort_options
      };
      search_results.criteria = search_records.criteria != null ? search_records.criteria : null;
      if (search_names_data != null) {
        search_results.search_names = search_names_data.search_names;
      }
      if (search_names_data != null) {
        search_results.is_search_tab = search_names_data.is_search_tab;
      }
      if (search_records.job_id != null) {
        search_results.job_id = search_records.job_id;
      }
      if ((search_records.results != null) && (search_records.results.hits != null)) {
        search_results.results = [];
        search_results.number_of_listings = search_records.results.hits;
        _ref = search_records.results.records;
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          records = _ref[index];
          result = {
            id: records.account_id,
            name: records.name,
            title: records.title,
            company: records.company_name,
            posted_date: records.last_update,
            rank: records.rank
          };
          if (subscription_status.toUpperCase() !== self.status_registered.toUpperCase() && subscription_status.toUpperCase() !== self.subscription_expired.toUpperCase()) {
            result.city = records.city;
            result.state = records.state;
          }
          filter = {
            account_id: records.account_id
          };
          if ((image_urls != null) && image_urls.length > 0 && lodash.some(image_urls, filter)) {
            result.logo = (lodash.find(image_urls, filter)).photo_url;
          } else {
            result.logo = ((_ref1 = lodash.find(image_urls, this.male_image)) != null ? _ref1.male_image : void 0) != null ? (lodash.find(image_urls, this.male_image)).male_image : '';
          }
          if (records.compatibility != null) {
            result.compatibility = this.process_compatibility(records.compatibility, this.account_type_hc);
          }
          filter = {
            id: records.account_id
          };
          _candidate = lodash.find(candidates.candidates_state, filter);
          if (_candidate != null) {
            result.is_saved = _candidate.is_saved;
            result.is_removed = _candidate.is_removed;
            result.compatibility_removed = _candidate.notified;
          } else {
            result.is_saved = this.no;
            result.is_removed = this.no;
            result.compatibility_removed = this.no;
          }
          search_results.results.push(result);
        }
      } else {
        search_results.number_of_listings = 0;
        search_results.results = null;
      }
      return search_results;
    };

    SearchService.prototype.process_compatibility = function (compatibility, account_type) {
      var compatibility_score, counter, culture, culture_text, heading, messages, personality, skills, type, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      compatibility_score = null;
      messages = [];
      counter = 0;
      heading = null;
      type = null;
      skills = null;
      personality = null;
      culture = null;
      culture_text = null;
      if (((_ref = compatibility.skill_score) != null ? _ref.score : void 0) != null) {
        counter = counter + 1;
        heading = this.skills_compatibility;
        type = this.skills_type;
        skills = compatibility.skill_score.score;
      }
      if (((_ref1 = compatibility.personality_score) != null ? _ref1.score : void 0) != null) {
        counter = counter + 1;
        heading = this.personality_compatibility;
        type = this.personality_type;
        personality = compatibility.personality_score.score;
      }
      if (((_ref2 = compatibility.culture_score_company) != null ? _ref2.score : void 0) != null) {
        counter = counter + 1;
        heading = this.culture_compatibility;
        type = this.culture_type;
        culture_text = this.company;
        culture = compatibility.culture_score_company.score;
      } else if ((((_ref3 = compatibility.culture_score_company) != null ? _ref3.score : void 0) == null) && (((_ref4 = compatibility.culture_score_industry_by_locale) != null ? _ref4.score : void 0) != null)) {
        counter = counter + 1;
        heading = this.culture_compatibility;
        type = this.culture_type;
        culture_text = this.locale;
        culture = compatibility.culture_score_industry_by_locale.score;
      } else if ((((_ref5 = compatibility.culture_score_company) != null ? _ref5.score : void 0) == null) && (((_ref6 = compatibility.culture_score_industry_by_locale) != null ? _ref6.score : void 0) == null) && (((_ref7 = compatibility.culture_score_industry_by_state) != null ? _ref7.score : void 0) != null)) {
        counter = counter + 1;
        heading = this.culture_compatibility;
        type = this.culture_type;
        culture_text = this.state;
        culture = compatibility.culture_score_industry_by_state.score;
      }
      if (counter === 1) {
        compatibility_score = {
          heading: heading,
          type: type
        };
        if (heading === this.skills_compatibility) {
          messages.push(account_type === this.account_type_js ? this.skills_default : this.skills_default_hc);
        } else if (heading === this.personality_compatibility) {
          messages.push(account_type === this.account_type_js ? this.personality_default : this.personality_default_hc);
        } else {
          if (culture_text === this.company) {
            messages.push((account_type === this.account_type_js ? this.culture_company_default : this.culture_company_default_hc) + culture_text);
          } else {
            messages.push((account_type === this.account_type_js ? this.culture_other_default : this.culture_other_default_hc) + culture_text);
          }
        }
      } else if (counter > 1) {
        compatibility_score = {
          heading: this.overall_compatibility,
          type: this.overall_type
        };
        if (culture != null) {
          compatibility_score.culture = culture;
        }
        if (skills != null) {
          compatibility_score.skills = skills;
        }
        if (personality != null) {
          compatibility_score.personality = personality;
        }
      }
      if (((_ref8 = compatibility.culture_score_company) != null ? (_ref9 = _ref8.failure_reasons) != null ? _ref9.length : void 0 : void 0) > 0 && (_ref10 = this.missing_data_company, __indexOf.call(compatibility.culture_score_company.failure_reasons, _ref10) >= 0) && ((_ref11 = compatibility.culture_score_industry_by_locale) != null ? (_ref12 = _ref11.failure_reasons) != null ? _ref12.length : void 0 : void 0) > 0 && (_ref13 = this.missing_data_company, __indexOf.call(compatibility.culture_score_industry_by_locale.failure_reasons, _ref13) >= 0) && ((_ref14 = compatibility.culture_score_industry_by_state) != null ? (_ref15 = _ref14.failure_reasons) != null ? _ref15.length : void 0 : void 0) > 0 && (_ref16 = this.missing_data_company, __indexOf.call(compatibility.culture_score_industry_by_state.failure_reasons, _ref16) >= 0) && (compatibility_score != null)) {
        messages.push(this.company_message);
      }
      if ((!lodash.isEmpty(messages)) && (compatibility_score != null)) {
        compatibility_score.messages = messages;
      }
      if (((_ref17 = compatibility.overall_score) != null ? _ref17.score : void 0) != null) {
        compatibility_score.heading_percentage = compatibility.overall_score.score;
      }
      if ((culture_text != null) && counter > 1) {
        compatibility_score.culture_text = culture_text;
      }
      return compatibility_score;
    };

    SearchService.prototype.process_js_init = function (criteria, type, question_version, correlation_id, next) {
      var self;
      self = this;
      return async.waterfall([
        function (callback) {
          return self.searchData.get_job_results(criteria, correlation_id, function (error, search_records) {
            if (error) {
              return callback(error);
            } else {
              if (search_records.error_message) {
                return callback(self.errors.validation(search_records.error_message));
              } else {
                self.logger.debug(correlation_id, " - results - ", search_records);
                return callback(null, search_records);
              }
            }
          });
        }, function (search_records, callback) {
          return self.process_js_results(criteria, question_version, search_records, type, correlation_id, function (error, records) {
            if (error) {
              return callback(error);
            } else {
              return callback(null, records);
            }
          });
        }
      ], function (err, search_results) {
        if (err) {
          return next(err);
        } else {
          return next(null, search_results);
        }
      });
    };

    SearchService.prototype.process_js_results = function (criteria, question_version, search_records, type, correlation_id, next) {
      var generic_info, self;
      self = this;
      generic_info = self._determine_subscription(criteria.user, correlation_id);
      return async.parallel([
        function (callback) {
          if ((search_records != null) && (search_records.results != null) && search_records.results.hits > 0) {
            if (generic_info) {
              return self.photoData.get_default_images(correlation_id, self.identifier_company, function (error, default_image) {
                if (error) {
                  self.logger.error(correlation_id, "process_js_results - Error in fetching default image for account id: " + criteria.user.account_id);
                  return callback(null, null);
                } else {
                  return callback(null, default_image);
                }
              });
            } else {
              return self.add_profile_url_js(search_records, type, correlation_id, (function (_this) {
                return function (error, photo_data) {
                  if (error) {
                    self.logger.error(correlation_id, "process_js_results - Error in fetching profile photo");
                    return callback(null, null);
                  } else {
                    return callback(null, photo_data);
                  }
                };
              })(this));
            }
          } else {
            return callback(null, []);
          }
        }, function (callback) {
          return self.searchData.user_job_state(criteria.user.account_id, correlation_id, function (error, jobs) {
            if (error) {
              return callback(error);
            } else {
              if (jobs.error_message) {
                return callback(self.errors.validation(jobs.error_message));
              } else {
                return callback(null, jobs);
              }
            }
          });
        }, function (callback) {
          return self.questionnaireData.get_all_questionnaire(question_version, correlation_id, function (error, question_ids) {
            var section, section_data, section_type, section_type_mapping, _i, _len, _ref;
            if (error) {
              return callback(error);
            } else {
              section_type_mapping = [];
              _ref = question_ids.sections;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                section = _ref[_i];
                section_data = {};
                section_type = section.type;
                section_data[section_type] = section.id;
                section_type_mapping.push(section_data);
              }
              return callback(null, section_type_mapping);
            }
          });
        }, function (callback) {
          return self.searchData.save_search_details(criteria, correlation_id, function (error, search_names) {
            var filter, is_search_tab, locals;
            is_search_tab = false;
            if (error) {
              return callback(error);
            } else {
              filter = {
                search_id: search_records.search_id
              };
              is_search_tab = lodash.some(search_records.search_names, filter);
              locals = {
                search_names: search_names,
                is_search_tab: is_search_tab
              };
              return callback(null, locals);
            }
          });
        }
      ], function (err, results) {
        if (err) {
          return next(err);
        } else {
          return next(null, self.format_js_results(generic_info, search_records, results[0], results[1], results[2], results[3]));
        }
      });
    };

    SearchService.prototype.format_js_results = function (generic_info, search_records, image_urls, jobs, mapping, search_names_data) {
      var filter, index, records, result, search_results, _i, _job, _len, _ref, _ref1;
      search_results = {
        search_id: search_records.search_id,
        correlation_id: search_records.correlation_id,
        search_type: search_records.search_type,
        eligible_for_score: search_records.eligible_for_score,
        sort_order: search_records.sort_order,
        eligible_sort_options: search_records.eligible_sort_options
      };
      if (mapping != null) {
        search_results.mapping = mapping;
      }
      if (search_names_data != null) {
        search_results.search_names = search_names_data.search_names;
      }
      if (search_names_data != null) {
        search_results.is_search_tab = search_names_data.is_search_tab;
      }
      search_results.criteria = search_records.criteria != null ? search_records.criteria : null;
      if ((search_records.results != null) && (search_records.results.hits != null)) {
        search_results.results = [];
        search_results.number_of_listings = search_records.results.hits;
        _ref = search_records.results.records;
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          records = _ref[index];
          result = {
            id: records.id,
            title: records.title,
            city: records.location.city,
            state: records.location.state,
            apply_url: records.apply_url,
            type: records.type,
            source_id: records.source_id,
            posted_date: records.posted_date,
            rank: records.rank
          };
          filter = {
            id: records.id
          };
          _job = lodash.find(jobs.user_job_state, filter);
          filter = {
            account_id_normalized_company_name: records.normalized_company_name != null ? records.account_id + this.slash + encodeURIComponent(records.normalized_company_name) : records.account_id
          };
          if (generic_info) {
            result.company = null;
            result.logo = image_urls[this.identifier_company];
          } else {
            result.company = records.company_name;
            if ((image_urls != null) && image_urls.length > 0 && lodash.some(image_urls, filter)) {
              result.logo = (lodash.find(image_urls, filter)).photo_url;
            } else {
              result.logo = ((_ref1 = lodash.find(image_urls, this.company_image)) != null ? _ref1.company_image : void 0) != null ? (lodash.find(image_urls, this.company_image)).company_image : '';
            }
          }
          if (records.compatibility != null) {
            result.compatibility = this.process_compatibility(records.compatibility, this.account_type_js);
          }
          if (_job != null) {
            result.is_saved = _job.is_saved;
            result.is_reported = _job.is_reported;
            result.is_removed = _job.is_removed;
            result.compatibility_removed = _job.notified;
          } else {
            result.is_saved = this.no;
            result.is_reported = this.no;
            result.is_removed = this.no;
            result.compatibility_removed = this.no;
          }
          search_results.results.push(result);
        }
      } else {
        search_results.number_of_listings = 0;
        search_results.results = null;
      }
      return search_results;
    };

    SearchService.prototype.saved_search_listings = function (req, res) {
      var correlation_id, criteria, self;
      correlation_id = req.headers['correlation_id'];
      self = this;
      criteria = {
        user: req.user
      };
      return self.searchData.save_search_details(criteria, correlation_id, function (error, search_names) {
        if (error) {
          return self.route_error_express(correlation_id, res, error);
        } else {
          return res.send({
            search_names: search_names
          });
        }
      });
    };

    SearchService.prototype.delimitify_questionnaire_versions = function (questionnaire_json, correlation_id) {
      var index, questionnaire_versions, section, sections, _i, _len;
      this.logger.debug(correlation_id, 'delimitify_questionnaire_versions - entry');
      questionnaire_versions = this.empty_string;
      sections = lodash.keys(questionnaire_json);
      for (index = _i = 0, _len = sections.length; _i < _len; index = ++_i) {
        section = sections[index];
        if (index + 1 !== sections.length) {
          questionnaire_versions = questionnaire_versions + section + this.colon_string + questionnaire_json[section] + this.delimiter;
        } else {
          questionnaire_versions = questionnaire_versions + section + this.colon_string + questionnaire_json[section];
        }
      }
      return questionnaire_versions;
    };

    //Datatable code start
    SearchService.prototype.get_data = function (req, res) {

    var  usersdata = MyjsonData.data;

      var correlation_id;
    //  correlation_id = req.headers['correlation_id'];
      this.logger.debug(correlation_id, 'is_user_logged_in : Entry -');
      return res.send({
        draw: 1,
        recordsTotal: usersdata.length,
        recordsFiltered: usersdata.length,
        data: usersdata
      });


    }


    SearchService.prototype.get_datatable = function (req, res) {
      var correlation_id, body, draw, search, colName, order, pageNo, perPageRecords, usersdata, userslist, search_data, sort_data,
        pagination, filtered, recordsTotal, recordsFiltered, data, agent, correlation_id, criteria, self, size;
      usersdata = MyjsonData;
      userslist = usersdata.data;
      if (req.body != null) {
        body = req.body;
        draw = body.draw;
        search = body['search[value]'] || '';
        colName = body['order[0][column]'] || '';
        order = body['order[0][dir]'] || 'asc';
        pageNo = body.currentPageIndex || 1;
        perPageRecords = body.length;

        if (search) {
          search_data = filterRecords(search, userslist);
          userslist = search_data;
        }
        if (colName) {
          if (colName == 0) { colName = 'PersonID'; }
          if (colName == 1) { colName = 'FirstName'; }
          if (colName == 2) { colName = 'MI'; }
          if (colName == 3) { colName = 'LastName'; }
          if (colName == 4) { colName = 'Title'; }
          if (colName == 5) { colName = 'Company'; }
          if (colName == 6) { colName = 'Street'; }
          if (colName == 7) { colName = 'City'; }
          if (colName == 8) { colName = 'State'; }
          if (colName == 9) { colName = 'Zip'; }
          if (colName == 10) { colName = 'Country'; }
          if (colName == 11) { colName = 'Phone1'; }
          if (colName == 12) { colName = 'Email1'; }

          sort_data = sort_by_colName(colName, order, userslist);
          userslist = sort_data;
        }
        if (pageNo) {
          //pagination = getPaginatedItems(userslist, pageNo, perPageRecords);
          //userslist = pagination; 
        }
        if (search) {
          filtered = search_data.length;
        } else {
          filtered = usersdata.data.length;
        }

        return res.send({
          draw: body,
          recordsTotal: filtered,
          recordsFiltered: filtered,
          data: userslist
        });

      }

      return res.send({
        data1: userslist
      });
    };

    SearchService.prototype.filterRecords = function (keyword, userslist) {
      var patt, newRecords;
      patt = new RegExp(keyword, 'i')
      newRecords = _.filter(records, function (obj) {

        if (patt.test(obj.PersonID) || patt.test(obj.FirstName) || patt.test(obj.MI) || patt.test(obj.LastName) || patt.test(obj.Title) || patt.test(obj.Company) || patt.test(obj.Street) || patt.test(obj.City) || patt.test(obj.State) || patt.test(obj.Zip) || patt.test(obj.Country) || patt.test(obj.Phone1) || patt.test(obj.Email1)) {
          return obj;
        }

      });
      return newRecords;
    };

    SearchService.prototype.sort_by_colName = function (colName, order, userslist) {
      var sort_data;
      if (order == 'asc') {
        var sort_data = lodash.sortBy(userslist, function (i) { return i[colName].toLowerCase(); });
        return sort_data;
      }
      if (order == 'desc') {
        var sort_data = (lodash.sortBy(userslist, function (i) { return i[colName].toLowerCase(); })).reverse();
        return sort_data;
      }
    };


    SearchService.prototype.getPaginatedItems = function (items, pageNo, perPageRecords) {
      var page, recPerPage, startRec, endRec, paginatedItems, totalPages;
      page = pageNo || 1;
      recPerPage = perPageRecords || 5;
      // Use Math.max to ensure that we at least start from record 0
      startRec = Math.max(page - 1, 0) * recPerPage;
      // The end index of Array.splice doesn't have to be within boundaries,
      endRec = Number(startRec) + Number(recPerPage);
      paginatedItems = items.slice(startRec, endRec);
      totalPages = Math.ceil(items.length / recPerPage);
      return paginatedItems;
    };

    //Datatable code end


    SearchService.prototype._determine_subscription = function (user, correlation_id) {
      var generic_info;
      this.logger.debug(correlation_id, '_determine_subscription - entry');
      if (user.status !== this.subscribed_status) {
        if (user.subscription_test_group_id != null) {
          if (user.subscription_plan_group_id != null) {
            generic_info = true;
          } else {
            generic_info = false;
          }
        } else {
          generic_info = false;
        }
      } else {
        generic_info = false;
      }
      return generic_info;
    };

    return SearchService;

  })(AbstractBaseService);

  module.exports = SearchService;

}).call(this);

//# sourceMappingURL=SearchService.js.map
