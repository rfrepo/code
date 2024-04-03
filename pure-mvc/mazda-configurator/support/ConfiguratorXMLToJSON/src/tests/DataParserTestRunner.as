package tests	
{		
	import asunit.textui.TestRunner;
	
	import flash.display.MovieClip;
			
	public class DataParserTestRunner extends MovieClip
	{								
		public function DataParserTestRunner()
		{
			var testRunner:TestRunner = new TestRunner();
			
			stage.addChild(testRunner);
			
			testRunner.start(DataParserTestSuite, null, TestRunner.SHOW_TRACE);
		};
	};
};