package tests.units
{
	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import vo.OptionPackVO;
	
	import parsers.AbstractParser;
	import parsers.OptionPackParser;
	
	import tests.ConfiguratorData;
	
	public class OptionPackParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allOptionPackVOs:Vector.<Object>;		
		
		private const BODY_STYLE:String = "bodyStyle"
		private const GRADE:String = "grade"
		private const ENGINE:String = "engine"
		private const TRIM:String = "trim";

		private var optionPackParser:AbstractParser;
		
		public function OptionPackParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			optionPackParser = new OptionPackParser();
			optionPackParser.parserData( ConfiguratorData.data );		
			
			allOptionPackVOs = optionPackParser.allVOs;
		};
				
		override protected function tearDown():void
		{
			allOptionPackVOs = null;
		};
		
		public function test_number_of_all_option_packs_is_as_expected():void
		{
			assertEquals(allOptionPackVOs.length, 10);
		};
		
		public function test_number_of_option_packs_after_grouping_by_id_is_as_expected():void
		{
			assertEquals(optionPackParser.groupedOnIdVOs.length, 3)
		};		
	
		
		public function test_optionPackIds_have_no_appended_ids():void
		{
			var optionPackId:String = allOptionPackVOs[1].id;			
			assertTrue( hasNoBodyStyleGradeAppended( optionPackId ));
		};
		
			private function hasNoBodyStyleGradeAppended( value:String ):Boolean
			{
				 var indexValue:int = 
					 value.indexOf("_2200") + value.indexOf("_5500") 
					 + value.indexOf("_001") + value.indexOf("_002") + value.indexOf("_003");
				
				 return Boolean( indexValue < -1 );
			};		
		
		public function test_optionPacks_have_availability_data_structure():void
		{			
			assertEquals( getFirstPreconditionType(), BODY_STYLE);
			assertEquals( getSecondPreconditionType(), GRADE);
			assertEquals( getThirdPreconditionType(), ENGINE);
		};	
			
			private function getFirstPreconditionType():String
			{
				return allOptionPackVOs[0].dependencies.availability[0].type;
			};
			
			private function getSecondPreconditionType():String
			{
				return allOptionPackVOs[0].dependencies.availability[0].preconditions[0].type;
			};
			
			private function getThirdPreconditionType():String
			{
				return allOptionPackVOs[0].dependencies.availability[0].preconditions[0].preconditions[0].type;
			};	
			
		public function test_vos_do_not_have_body_series_and_engine_properties():void
		{			
				assertFalse( allOptionPackVOs[0].hasOwnProperty( BODY_STYLE));
				assertFalse( allOptionPackVOs[0].hasOwnProperty( GRADE));
				assertFalse( allOptionPackVOs[0].hasOwnProperty( ENGINE));			
		};
		
		public function test_optionPacks_have_selection_dependency_structure():void
		{			
			assertEquals(getSelectionDependency(), TRIM)
		};	
		
		private function getSelectionDependency():String
		{
			return allOptionPackVOs[0].dependencies.selection[0].type;
		};	
		
	};
};