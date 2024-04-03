package vo
{	
	
	public class BaseVehicleVO 
	{		
		private var _id:String;
		
		private var _title:String;
		
		private var _rank:int;  
		
		private var _bodystyle:String;
		
		private var _engine:String;
				
		private var _keyCriteria:Vector.<String>; 
		
		private var _option:Vector.<String>;
		
		private var _optionPack:Vector.<String>;
		
		private var _portFitAccessories:Vector.<String>;
		
		private var _capCode:String;

		public function get id():String
		{
			return _id;
		}

		public function set id(value:String):void
		{
			_id = value;
		}

		public function get name():String
		{
			return _title;
		}

		public function set name(value:String):void
		{
			_title = value;
		}

		public function get rank():int
		{
			return _rank;
		}

		public function set rank(value:int):void
		{
			_rank = value;
		}

		public function get bodyStyleId():String
		{
			return _bodystyle;
		}

		public function set bodyStyleId(value:String):void
		{
			_bodystyle = value;
		}

		public function get engineId():String
		{
			return _engine;
		}

		public function set engineId(value:String):void
		{
			_engine = value;
		}

		public function get keyCriteria():Vector.<String>
		{
			return _keyCriteria;
		}

		public function set keyCriteria(value:Vector.<String>):void
		{
			_keyCriteria = value;
		}

		public function get standardFeaturesIds():Vector.<String>
		{
			return _option;
		}

		public function set standardFeaturesIds(value:Vector.<String>):void
		{
			_option = value;
		}

		public function get optionPackIds():Vector.<String>
		{
			return _optionPack;
		}

		public function set optionPackIds(value:Vector.<String>):void
		{
			_optionPack = value;
		}

		public function get portFitAccessories():Vector.<String>
		{
			return _portFitAccessories;
		}

		public function set portFitAccessories(value:Vector.<String>):void
		{
			_portFitAccessories = value;
		}

		public function get capCode():String
		{
			return _capCode;
		}

		public function set capCode(value:String):void
		{
			_capCode = value;
		}

		public function get specPage():String
		{
			return _specPage;
		}

		public function set specPage(value:String):void
		{
			_specPage = value;
		}

		public function get price():String
		{
			return _price;
		}

		public function set price(value:String):void
		{
			_price = value;
		}
	
		private var _specPage:String;
		
		private var _price:String;
		
		public function BaseVehicleVO()
		{
			
		};		
	};
};