package tests.units
{	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import parsers.AbstractParser;
	import parsers.WheelParser;
	
	import tests.ConfiguratorData;
	
	public class WheelParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allVOs:Vector.<Object>;		
		
		private const BODY_STYLE:String = "bodyStyle";
		private const GRADE:String = "grade";
		private const ENGINE:String = "engine";
		private const PRICE:String = "price";

		private var wheelParser:AbstractParser;
		
		public function WheelParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			wheelParser = new WheelParser();
			wheelParser.parserData( ConfiguratorData.data );
			
			allVOs = wheelParser.allVOs;
		};
				
		override protected function tearDown():void
		{
			allVOs = null;
		};
		
		public function test_number_of_all_trims_is_as_expected():void
		{
			assertEquals(2,allVOs.length);
		};
		
		
		public function test_accessories_have_availability_data_structure():void
		{			
			assertEquals( getFirstPreconditionType(), GRADE);			
			assertEquals( getSecondPreconditionType(), ENGINE);			
		};	
			
			private function getFirstPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].type;
			};
			
			private function getSecondPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].preconditions[0].type;
			};					
	};
};