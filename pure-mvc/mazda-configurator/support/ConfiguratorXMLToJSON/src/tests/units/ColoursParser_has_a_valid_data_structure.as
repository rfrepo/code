package tests.units
{
	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import parsers.AbstractParser;
	import parsers.ColourParser;
	
	import tests.ConfiguratorData;
	
	public class ColoursParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allVOs:Vector.<Object>;		
		
		private const BODY_STYLE:String = "bodyStyle";
		private const GRADE:String = "grade";		

		private var coloursParser:AbstractParser;
		
		public function ColoursParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			coloursParser = new ColourParser();
			coloursParser.parserData( ConfiguratorData.data );		
			
			allVOs = coloursParser.allVOs;
		};
				
		override protected function tearDown():void
		{
			allVOs = null;
		};
		
		public function test_number_of_all_colours_is_as_expected():void
		{
			assertEquals(16,allVOs.length);
		};
		
		public function test_number_of_all_grouped_colours_is_as_expected():void
		{
			assertEquals(8, coloursParser.uniqueVOs.length);
		};
		
		
		public function test_colours_have_availability_data_structure():void
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
			
	};
};