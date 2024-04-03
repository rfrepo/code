package support
{
	public class VehicleConstructConstants
	{
		static public const VEHICLE:String = "vehicle";
		static public const BODYSTYLE:String = "bodystyle";
		static public const SERIES:String = "series";
		static public const ENGINE:String = "engine";
		static public const COLOUR:String = "colour";
		static public const WHEEL:String = "wheel";
		static public const TRIM:String = "trim";
		static public const OPTION:String = "option";
		static public const PORT_FIT_ACCESSOIRES:String = "portFitAccessories";
		static public const OPTION_PACK:String = "optionPack";
		static public const ACCESSORIES:String = "accessories";
		
		static public var all:Vector.<String> = new <String>[VEHICLE, BODYSTYLE, SERIES, ENGINE, COLOUR, WHEEL, TRIM, OPTION, ACCESSORIES, OPTION_PACK, PORT_FIT_ACCESSOIRES];
		
		static public var parserNames:Vector.<String> = new <String>[VEHICLE, BODYSTYLE, SERIES, ENGINE, COLOUR, WHEEL, TRIM, OPTION, ACCESSORIES, OPTION_PACK ];
		
		static public var sectionNames:Vector.<String> = new <String>[ BODYSTYLE, SERIES, ENGINE, COLOUR, WHEEL, TRIM, OPTION_PACK, ACCESSORIES];
	
		
	};
}