(function ($) {

  Drupal.behaviors.mlsoccer = {
    attach: function (context, settings) {
	  	var oTableEast = $('#mlsoccer-standings-east-datatable').dataTable( {
					"bProcessing": true,
					"bPaginate": false,
					"bInfo":false,
					"sAjaxSource": "http://devel/mlsoccer/ajax/standings",
					"aoColumns": [
						{ "mData": "Conference", "bVisible": false },
						{ "mData": "Position" },
						{ "mData": "Club" },
						{ "mData": "Points" },
						{ "mData": "Played" },
						{ "mData": "Won" },
						{ "mData": "Lost" },
						{ "mData": "Drawn" },
						{ "mData": "For" },
						{ "mData": "Against" },
						{ "mData": "GoalDifference" },
						{ "mData": "HomeFor" },
						{ "mData": "HomeGoalDifference" },
						{ "mData": "AwayFor" },
						{ "mData": "RoadGoalDifference" }
					],
					"aaSorting": [[ 1, "asc" ]],
					"fnRowCallback": function(nRow, aData, iDisplayIndex) {
						setPlayoffCut(5, this.fnSettings().aaSorting, nRow, aData);
						setPlayOffSecured(nRow, aData);
   					return nRow;
					}
			});

	  	if ($('#mlsoccer-standings-east-datatable').length != 0) {
				oTableEast.fnFilter('East');
				$('#mlsoccer-standings-east-datatable_filter').hide();
	  	}

			var oTableWest = $('#mlsoccer-standings-west-datatable').dataTable( {
					"bProcessing": true,
					"bPaginate": false,
					"bInfo":false,
					"sAjaxSource": "http://devel/mlsoccer/ajax/standings",
					"aoColumns": [
						{ "mData": "Conference", "bVisible": false },
						{ "mData": "Position" },
						{ "mData": "Club" },
						{ "mData": "Points" },
						{ "mData": "Played" },
						{ "mData": "Won" },
						{ "mData": "Lost" },
						{ "mData": "Drawn" },
						{ "mData": "For" },
						{ "mData": "Against" },
						{ "mData": "GoalDifference" },
						{ "mData": "HomeFor" },
						{ "mData": "HomeGoalDifference" },
						{ "mData": "AwayFor" },
						{ "mData": "RoadGoalDifference" }
					],
					"aaSorting": [[ 1, "asc" ]],
					"fnRowCallback": function(nRow, aData, iDisplayIndex) {
						setPlayoffCut(5, this.fnSettings().aaSorting, nRow, aData);
						setPlayOffSecured(nRow, aData);
   					return nRow;
					}
			});

			if ($('#mlsoccer-standings-west-datatable').length != 0) {
				oTableWest.fnFilter('West');
				$('#mlsoccer-standings-west-datatable_filter').hide();
	  	}

			var oTableSupporters = $('#mlsoccer-supporters-shield-datatable').dataTable( {
					"bProcessing": true,
					"bPaginate": false,
					"bInfo":false,
					"bFilter":false,
					"sAjaxSource": "http://devel/mlsoccer/ajax/standings",
					"aoColumns": [
						{ "mData": "Conference", "bVisible": false },
						{ "mData": "Position" },
						{ "mData": "Club" },
						{ "mData": "Points" },
						{ "mData": "Played" },
						{ "mData": "Won" },
						{ "mData": "Lost" },
						{ "mData": "Drawn" },
						{ "mData": "For" },
						{ "mData": "Against" },
						{ "mData": "GoalDifference" },
						{ "mData": "HomeFor" },
						{ "mData": "HomeGoalDifference" },
						{ "mData": "AwayFor" },
						{ "mData": "RoadGoalDifference" }
					],
					"aaSorting": [[ 3, "desc" ]],
					"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
						$("td:first", nRow).html(iDisplayIndex +1);
						sortInfo = this.fnSettings().aaSorting;
						if (iDisplayIndex == 0 && (sortInfo[0][0] == 1 && sortInfo[0][1] == "asc" || sortInfo[0][0] == 3 && sortInfo[0][1] == "desc") ) {
							nRow.className = nRow.className + " playoff-cut";
						}
						else  {
							$(nRow).removeClass("playoff-cut");
						}
						setPlayOffSecured(nRow, aData);
   					return nRow;
					}
			});

			function setPlayOffSecured(nRow, aData) {
				if (aData['Position'] <= 5) {
					$("td:eq(1)", nRow).html("x " + aData['Club']);
				}
			}

			function setPlayoffCut(cut, sortInfo, nRow, aData) {
				if (aData['Position'] == cut && sortInfo[0][0] == 1 && sortInfo[0][1] == "asc" ) {
					nRow.className = nRow.className + " playoff-cut";
				}
				else if (aData['Position'] == cut) {
					$(nRow).removeClass("playoff-cut");
				}
			}
    }
  };

})(jQuery);
