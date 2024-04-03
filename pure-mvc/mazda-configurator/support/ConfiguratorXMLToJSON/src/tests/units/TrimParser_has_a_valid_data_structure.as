package tests.units
{
	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import vo.data.TrimVO;
	
	import parsers.AbstractParser;
	import parsers.TrimParser;
	
	import tests.ConfiguratorData;
	
	public class TrimParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allVOs:Vector.<Object>;		
		
		private const BODY_STYLE:String = "bodyStyle";
		private const GRADE:String = "grade";
		private const ENGINE:String = "engine";
		private const PRICE:String = "price";

		private var trimParser:TrimParser;
		
		public function TrimParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			trimParser = new TrimParser();
			trimParser.parserData( ConfiguratorData.data );		
			
			allVOs = AbstractParser(trimParser).allVOs;
		};
				
		override protected function tearDown():void
		{
			allVOs = null;
		};
		
		public function test_number_of_all_trims_is_as_expected():void
		{
			assertEquals(6,allVOs.length);
		};
		
		public function test_number_of_trims_after_grouping_by_id_is_as_expected():void
		{
			assertEquals(3, trimParser.groupedOnIdVOs.length)
		};
		
		public function test_trimIds_have_no_appended_ids():void
		{
			var optionPackId:String = allVOs[1].id;			
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
		};	
			
			private function getFirstPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].type;
			};
			
			private function getSecondPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].preconditions[0].type;
			};
			
			private function getThirdPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].precondition[0].precondition[0].type;
			};			
			
		public function test_first_trim_to_have_two_availabilty_dependencies():void
		{
			assertEquals(2, allVOs[0].dependencies.availability.length);		
		};	
		
		public function test_first_trim_has_price_dependency():void
		{
			assertEquals(2, allVOs[0].dependencies.price.length);			
		};		
		
		public function test_vos_do_not_have_body_series_and_engine_properties():void
		{			
				assertFalse( allVOs[0].hasOwnProperty( BODY_STYLE));
				assertFalse( allVOs[0].hasOwnProperty( GRADE));
					
		};
	};
};