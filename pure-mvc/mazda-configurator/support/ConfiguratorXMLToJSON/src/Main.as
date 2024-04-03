package
{
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.text.TextField;
	
	import mx.controls.Button;
	
	import parsers.AccessoriesParser;
	import parsers.BodyStyleParser;
	import parsers.ColourParser;
	import parsers.EngineParser;
	import parsers.GradeParser;
	import parsers.OptionPackParser;
	import parsers.TrimParser;
	import parsers.WheelParser;
	
	[SWF(width='1024', height='768', backgroundColor='#ffffff', frameRate='30')]
	
	public class Main extends Sprite
	{	
		private var parsers:Array = [
			/*new TrimParser
			new BodyStyleParser,
			new GradeParser,
			new ColourParser, 
			new WheelParser,
			new EngineParser,			
			new OptionPackParser,*/
			new AccessoriesParser
		];

		private var configuratorJSON:Object = {}
		
		public function Main()
		{
			loadConfiguratorData();			
		};
		
		protected function loadConfiguratorData():void
		{
			var loader:URLLoader =  new URLLoader();
			loader.addEventListener( Event.COMPLETE, handleDataLoadCompleted);
			loader.load(new URLRequest("configurator.xml"));
		};			
		
		private function handleDataLoadCompleted( e:Event ):void
		{			
			populateConfiguratorJSON();			
			initParsers( new XML( e.target.data ));
			addParserDataToConfiguration();
		};	
		
		private function populateConfiguratorJSON():void
		{
			//configuratorJSON.modelID = "M6";
			//configuratorJSON.modelName = "Mazda6";
			//configuratorJSON.startupBaseVehicleId = "GHW8BAA";		
		};
		
		private function initParsers( data:XML ):void
		{
			var parser:Object;
			
			for (var i:int = 0; i < 1; i++) 
			{
				Object( parsers[i] ).parserData( data );				
			}			
		};		
		
		private function instantiateParser(ParserClass:Class):*
		{
			return new ParserClass();
		};
		
		private function addParserDataToConfiguration():void
		{			
			//configuratorJSON.bodyStyles = Object( parsers[0] ).uniqueVOs;		
			//configuratorJSON.grades = Object( parsers[1] ).uniqueVOs;		
			//configuratorJSON.colour = Object( parsers[2] ).uniqueVOs;
			//configuratorJSON.wheel = Object( parsers[3] ).uniqueVOs;
			//configuratorJSON.trim = Object( parsers[5] ).uniqueVOs;

			trace( JSON.stringify( Object( parsers[0] ).uniqueVOs ));
			
			var t:TextField= new TextField();
			t.text = "Play";
			
			var b:SimpleButton = new SimpleButton(t);
			addChild( b )
			
		};
		
	}	
}