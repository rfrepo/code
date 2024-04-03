package tests.units
{	
	import asunit.framework.Test;
	import asunit.framework.TestCase;
	
	import parsers.AbstractParser;
	import parsers.GradeParser;
	
	import tests.ConfiguratorData;
	
	public class GradeParser_has_a_valid_data_structure extends TestCase implements Test
	{		
		private var allVOs:Vector.<Object>;		
		
		private const BODY_STYLE:String = "bodyStyle";
		private const GRADE:String = "grade";
		private const ENGINE:String = "engine";
		private const PRICE:String = "price";

		private var gradeParser:AbstractParser;
		
		public function GradeParser_has_a_valid_data_structure(testMethod:String=null)
		{
			super(testMethod);				
		}		
		
		override protected function setUp():void
		{
			gradeParser = new GradeParser();
			gradeParser.parserData( ConfiguratorData.data );
			
			allVOs = gradeParser.allVOs;
		};
				
		override protected function tearDown():void
		{
			allVOs = null;
		};
		
		public function test_number_of_grades_is_as_expected():void
		{
			assertEquals(3,allVOs.length);
		};		
		
		public function test_grades_have_availability_data_structure():void
		{			
			assertEquals( getFirstPreconditionType(), BODY_STYLE);			
					
		};	
			
			private function getFirstPreconditionType():String
			{
				return allVOs[0].dependencies.availability[0].type;
			};				
	};
};